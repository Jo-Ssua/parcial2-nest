# Evaluación Corte 2 — Computación en Internet 3

API REST construida con **NestJS 11**, **TypeORM** y **PostgreSQL**. Es el mismo proyecto que trabajamos en clase: los módulos `student` (con `grades`), `user` (registro, login, JWT, `@Auth()`, `@GetUser()`) y `seed` **ya están implementados y funcionando**. Úsalos como referencia del estilo de código que se espera.

Tu trabajo es construir un módulo nuevo, **`program`** (programa académico, por ejemplo "Ingeniería de Sistemas"), completando los 4 retos marcados con `// TODO` en el código.

## Tiempo estimado

2 horas.

## Requisitos previos

- Node.js 18+
- PostgreSQL accesible (local o Docker)

## Instalación y ejecución

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Copia `.env.example` como `.env` y ajusta los valores de tu base de datos:

   ```bash
   cp .env.example .env
   ```

   Si no tienes un PostgreSQL corriendo, puedes levantar uno con Docker:

   ```bash
   docker run -d --name postgres-icesi \
     -p 5432:5432 \
     -e POSTGRES_PASSWORD=postgres \
     -e POSTGRES_DB=compunet3 \
     postgres:14.3
   ```

3. Levanta la app:

   ```bash
   npm run start:dev
   ```

4. Carga los 40 estudiantes de prueba: `GET http://localhost:9000/api/seed`.

La API queda en `http://localhost:9000/api` (la documentación Swagger se sirve en esa misma URL desde el navegador). Importa la colección de Postman de [postman/2026-2-evaluacion-corte2.postman_collection.json](postman/2026-2-evaluacion-corte2.postman_collection.json): trae una petición de ejemplo para cada reto.

### Cómo obtener un usuario `admin`

Todo usuario nuevo se registra con el rol `teacher`. Para probar los endpoints protegidos del Reto 4 necesitas un `admin`:

1. Regístrate con `POST /api/user/signup`.
2. Dale el rol `admin` directamente en la base de datos:

   ```sql
   UPDATE "user" SET roles = '{admin}' WHERE email = 'tu-correo@icesi.edu.co';
   ```

3. Inicia sesión con `POST /api/user/auth` y usa el `token` en el header `Authorization: Bearer <token>`.

## Dónde trabajar

Busca los comentarios `// TODO` en:

- [src/program/](src/program/): `program.module.ts`, `program.controller.ts`, `program.service.ts`, `entities/program.entity.ts`, `dto/create-program.dto.ts`, `dto/assign-students.dto.ts`, `dto/bulk-create-program.dto.ts`
- [src/student/entities/student.entity.ts](src/student/entities/student.entity.ts): la relación con `Program`
- [src/app.module.ts](src/app.module.ts): registrar el módulo

**No modifiques** el comportamiento de los módulos `student`, `user` y `seed`. Solo agrega código nuevo; la única excepción es la relación nueva en `Student`.

Usa **imports relativos** (`../../student/entities/student.entity`) en lugar de `src/...`: Jest no resuelve ese alias y `npm run test` dejaría de pasar.

---

## Reto 1 — Módulo y entidad `Program`

`POST /api/program` · `GET /api/program`

Crea la entidad `Program` (tabla `program`) y su módulo:

| Columna | Tipo | Reglas |
|---|---|---|
| `id` | UUID | Generado automáticamente |
| `name` | text | Único |
| `code` | text | Único |
| `credits` | int | — |

**Body de ejemplo (`POST`):**

```json
{ "name": "Ingenieria de Sistemas", "code": "SIS", "credits": 160 }
```

**Criterios de aceptación:**

- [ ] `ProgramModule` está registrado en `AppModule` y la entidad `Program` con `TypeOrmModule.forFeature`. Al arrancar, se crea la tabla `program`.
- [ ] `CreateProgramDto` valida: `name` string de mínimo 3 caracteres; `code` de 3 a 6 letras **mayúsculas**; `credits` entero positivo. Si algo no cumple, la respuesta es `400`.
- [ ] `POST /api/program` crea el programa y responde `201` con el programa creado.
- [ ] Un `name` o `code` repetido responde **`409 Conflict`**, no `500` ni una respuesta vacía.
- [ ] `GET /api/program` lista los programas y acepta `limit` y `skip` (reutiliza `PaginationDto`).

## Reto 2 — Relación con `Student` y asignación acumulativa

`GET /api/program/:id` · `PATCH /api/program/:id/students`

Un programa tiene **muchos** estudiantes; un estudiante pertenece a **un** programa (o a ninguno).

El `PATCH` **agrega** estudiantes al programa: los que ya estaban asignados se conservan. Resuélvelo con el mismo patrón del `update` de estudiantes corregido en clase, el que combina las notas actuales con las nuevas en vez de reemplazarlas:

1. Dentro de la transacción, trae el programa con los estudiantes que tiene hoy.
2. Combina: agrega solo los estudiantes nuevos (los que ya están no se repiten).
3. Guarda la lista completa con `queryRunner.manager.save(program)`.

> Ojo: si guardas `program.students` solo con los estudiantes nuevos, TypeORM deja a los anteriores **sin programa** (`programId` en `NULL`). Es el mismo problema de las notas huérfanas que vimos en clase con el `update` de estudiantes.

**Body de ejemplo (`PATCH`):**

```json
{ "studentIds": ["<uuid estudiante 1>", "<uuid estudiante 2>"] }
```

**Criterios de aceptación:**

- [ ] Relación `@ManyToOne` en `Student` (propiedad `program`, opcional) y `@OneToMany` en `Program` (propiedad `students`). En la tabla `student` aparece la columna `programId`.
- [ ] `AssignStudentsDto` valida que `studentIds` sea un arreglo **no vacío** de UUIDs. Si no, `400`.
- [ ] `GET /api/program/:id` devuelve el programa **con sus estudiantes**. Si el `id` no es un UUID, `400`; si no existe, `404`.
- [ ] El `PATCH` usa una **transacción** (`QueryRunner`: `connect`, `startTransaction`, `commitTransaction` / `rollbackTransaction`, `release`) y responde `200` con el programa y sus estudiantes.
- [ ] Es **acumulativo**: asignar `[A, B]` y luego `[C]` deja al programa con `A`, `B` y `C`. Enviar un estudiante que ya está asignado no lo duplica ni da error.
- [ ] Si el programa no existe: `404`.
- [ ] Si **algún** `studentId` no existe: `404` y **ningún** estudiante de esa petición queda asignado (rollback).

## Reto 3 — Creación de programas en lote

`POST /api/program/bulk`

Crea varios programas en una sola petición, con la regla **todo o nada**: si alguno falla, no se crea ninguno.

**Body de ejemplo:**

```json
{
  "programs": [
    { "name": "Arquitectura", "code": "ARQ", "credits": 170 },
    { "name": "Derecho", "code": "DER", "credits": 165 }
  ]
}
```

**Criterios de aceptación:**

- [ ] `BulkCreateProgramDto` valida que `programs` sea un arreglo **no vacío** y que **cada** elemento cumpla las reglas de `CreateProgramDto` (validación anidada). Un solo elemento inválido → `400`.
- [ ] Si todo es válido, responde `201` con los programas creados.
- [ ] Si algún `name` o `code` ya existe en la base de datos, **o** se repite dentro del mismo lote: `409` y **no se crea ninguno** (transacción).

## Reto 4 — Seguridad

**Criterios de aceptación:**

- [ ] `POST /api/program`, `POST /api/program/bulk` y `PATCH /api/program/:id/students` solo los puede usar un usuario con rol **`admin`**: sin token, `401`; con un usuario `teacher`, `403`.
- [ ] `GET /api/program` y `GET /api/program/:id` siguen siendo públicos.
- [ ] `Program` tiene una relación `@ManyToOne` con `User` (propiedad `createdBy`). Al crear programas (uno o en lote) se guarda el admin que los creó, obtenido del token con `@GetUser()`, **no** del body.

---

## Entrega

Haz commit y push a tu repositorio de GitHub Classroom antes de que termine el tiempo de la evaluación. Se revisará el último commit dentro del horario asignado. **No subas tu `.env`.**

## Cuestionario

Además del ejercicio de código, responde el cuestionario de selección múltiple en [QUIZ.md](QUIZ.md).
