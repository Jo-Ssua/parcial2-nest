import { Grades } from "src/student/entities/grades.entity";

export class SeedStudent{
    name: string;
    age: number;
    email: string;
    isActive: boolean;
    gender: 'Male' | 'Female' | 'Other';
    favoriteSubjects: string[];
    nickname?: string;
    grades: Grades[];
}

interface SeedData{
    students: SeedStudent[];
}

export const initialData: SeedData = {
    students: [
        {
            name: "Gus",
            age: 21,
            email: "gus@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["P.E", "Physics"],
            grades: [
                { subject: "P.E", grade: 5 },
                { subject: "Physics", grade: 5 }
            ]
        },
        {
            name: "Valentina",
            age: 33,
            email: "valentina@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["Programming", "Biology"],
            grades: [
                { subject: "Programming", grade: 5 },
                { subject: "Biology", grade: 5 }
            ]
        },
        {
            name: "Alejandro",
            age: 20,
            email: "alejandro@gmail.com",
            isActive: false,
            gender: "Male",
            favoriteSubjects: ["Biology", "P.E"],
            grades: [
                { subject: "Biology", grade: 1 },
                { subject: "P.E", grade: 5 }
            ]
        },
        {
            name: "Daniela",
            age: 28,
            email: "daniela@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["P.E", "Chemistry"],
            grades: [
                { subject: "P.E", grade: 1 },
                { subject: "Chemistry", grade: 4 }
            ]
        },
        {
            name: "Samuel",
            age: 34,
            email: "samuel@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["History", "Physics"],
            grades: [
                { subject: "History", grade: 3 },
                { subject: "Physics", grade: 4 }
            ]
        },
        {
            name: "Isabella",
            age: 27,
            email: "isabella@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["English", "Math"],
            grades: [
                { subject: "English", grade: 5 },
                { subject: "Math", grade: 5 }
            ]
        },
        {
            name: "Jonathan",
            age: 18,
            email: "jonathan@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["Physics", "English"],
            grades: [
                { subject: "Physics", grade: 5 },
                { subject: "English", grade: 3 }
            ]
        },
        {
            name: "Leidy",
            age: 20,
            email: "leidy@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["English", "Physics"],
            grades: [
                { subject: "English", grade: 4 },
                { subject: "Physics", grade: 4 }
            ]
        },
        {
            name: "Miguel",
            age: 34,
            email: "miguel@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["Biology", "Programming"],
            grades: [
                { subject: "Biology", grade: 1 },
                { subject: "Programming", grade: 4 }
            ]
        },
        {
            name: "Sofia",
            age: 31,
            email: "sofia@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["Biology", "Chemistry"],
            grades: [
                { subject: "Biology", grade: 5 },
                { subject: "Chemistry", grade: 3 }
            ]
        },
        {
            name: "Santiago",
            age: 25,
            email: "santiago@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["Biology", "History"],
            grades: [
                { subject: "Biology", grade: 5 },
                { subject: "History", grade: 1 }
            ]
        },
        {
            name: "Mariana",
            age: 31,
            email: "mariana@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["Math", "English"],
            grades: [
                { subject: "Math", grade: 5 },
                { subject: "English", grade: 1 }
            ]
        },
        {
            name: "Sebastian",
            age: 33,
            email: "sebastian@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["Biology", "P.E"],
            grades: [
                { subject: "Biology", grade: 1 },
                { subject: "P.E", grade: 4 }
            ]
        },
        {
            name: "Camila",
            age: 35,
            email: "camila@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["History", "Biology"],
            grades: [
                { subject: "History", grade: 4 },
                { subject: "Biology", grade: 3 }
            ]
        },
        {
            name: "Mateo",
            age: 24,
            email: "mateo@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["Biology", "Programming"],
            grades: [
                { subject: "Biology", grade: 4 },
                { subject: "Programming", grade: 4 }
            ]
        },
        {
            name: "Valeria",
            age: 32,
            email: "valeria@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["History", "Math"],
            grades: [
                { subject: "History", grade: 1 },
                { subject: "Math", grade: 2 }
            ]
        },
        {
            name: "Nicolas",
            age: 33,
            email: "nicolas@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["Biology", "Physics"],
            grades: [
                { subject: "Biology", grade: 2 },
                { subject: "Physics", grade: 3 }
            ]
        },
        {
            name: "Gabriela",
            age: 19,
            email: "gabriela@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["Biology", "Programming"],
            grades: [
                { subject: "Biology", grade: 4 },
                { subject: "Programming", grade: 5 }
            ]
        },
        {
            name: "Juan Pablo",
            age: 34,
            email: "juan.pablo@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["English", "Chemistry"],
            grades: [
                { subject: "English", grade: 1 },
                { subject: "Chemistry", grade: 4 }
            ]
        },
        {
            name: "Luciana",
            age: 26,
            email: "luciana@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["Physics", "Chemistry"],
            grades: [
                { subject: "Physics", grade: 4 },
                { subject: "Chemistry", grade: 1 }
            ]
        },
        {
            name: "Andres",
            age: 22,
            email: "andres@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["English", "Math"],
            grades: [
                { subject: "English", grade: 2 },
                { subject: "Math", grade: 4 }
            ]
        },
        {
            name: "Paula",
            age: 35,
            email: "paula@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["Math", "Biology"],
            grades: [
                { subject: "Math", grade: 1 },
                { subject: "Biology", grade: 4 }
            ]
        },
        {
            name: "Felipe",
            age: 21,
            email: "felipe@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["P.E", "History"],
            grades: [
                { subject: "P.E", grade: 2 },
                { subject: "History", grade: 2 }
            ]
        },
        {
            name: "Natalia",
            age: 18,
            email: "natalia@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["History", "English"],
            grades: [
                { subject: "History", grade: 3 },
                { subject: "English", grade: 2 }
            ]
        },
        {
            name: "Diego",
            age: 25,
            email: "diego@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["Biology", "English"],
            grades: [
                { subject: "Biology", grade: 2 },
                { subject: "English", grade: 5 }
            ]
        },
        {
            name: "Laura",
            age: 20,
            email: "laura@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["Physics", "History"],
            grades: [
                { subject: "Physics", grade: 5 },
                { subject: "History", grade: 3 }
            ]
        },
        {
            name: "Tomas",
            age: 34,
            email: "tomas@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["Physics", "P.E"],
            grades: [
                { subject: "Physics", grade: 5 },
                { subject: "P.E", grade: 3 }
            ]
        },
        {
            name: "Manuela",
            age: 18,
            email: "manuela@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["Physics", "History"],
            grades: [
                { subject: "Physics", grade: 2 },
                { subject: "History", grade: 4 }
            ]
        },
        {
            name: "David",
            age: 29,
            email: "david@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["Programming", "Math"],
            grades: [
                { subject: "Programming", grade: 1 },
                { subject: "Math", grade: 3 }
            ]
        },
        {
            name: "Sara",
            age: 28,
            email: "sara@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["Math", "Biology"],
            grades: [
                { subject: "Math", grade: 5 },
                { subject: "Biology", grade: 4 }
            ]
        },
        {
            name: "Carlos",
            age: 32,
            email: "carlos@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["Biology", "Physics"],
            grades: [
                { subject: "Biology", grade: 1 },
                { subject: "Physics", grade: 4 }
            ]
        },
        {
            name: "Juliana",
            age: 24,
            email: "juliana@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["Physics", "P.E"],
            grades: [
                { subject: "Physics", grade: 5 },
                { subject: "P.E", grade: 5 }
            ]
        },
        {
            name: "Esteban",
            age: 20,
            email: "esteban@gmail.com",
            isActive: true,
            gender: "Male",
            favoriteSubjects: ["English", "Chemistry"],
            grades: [
                { subject: "English", grade: 5 },
                { subject: "Chemistry", grade: 2 }
            ]
        },
        {
            name: "Antonia",
            age: 35,
            email: "antonia@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["Math", "P.E"],
            grades: [
                { subject: "Math", grade: 2 },
                { subject: "P.E", grade: 1 }
            ]
        },
        {
            name: "Emilio",
            age: 18,
            email: "emilio@gmail.com",
            isActive: false,
            gender: "Male",
            favoriteSubjects: ["Math", "Chemistry"],
            grades: [
                { subject: "Math", grade: 2 },
                { subject: "Chemistry", grade: 4 }
            ]
        },
        {
            name: "Catalina",
            age: 23,
            email: "catalina@gmail.com",
            isActive: true,
            gender: "Female",
            favoriteSubjects: ["Chemistry", "Programming"],
            grades: [
                { subject: "Chemistry", grade: 5 },
                { subject: "Programming", grade: 2 }
            ]
        },
        {
            name: "Alex",
            age: 35,
            email: "alex@gmail.com",
            isActive: true,
            gender: "Other",
            favoriteSubjects: ["Physics", "Chemistry"],
            grades: [
                { subject: "Physics", grade: 3 },
                { subject: "Chemistry", grade: 4 }
            ]
        },
        {
            name: "Ariel",
            age: 29,
            email: "ariel@gmail.com",
            isActive: true,
            gender: "Other",
            favoriteSubjects: ["P.E", "Chemistry"],
            grades: [
                { subject: "P.E", grade: 3 },
                { subject: "Chemistry", grade: 2 }
            ]
        },
        {
            name: "Sam",
            age: 32,
            email: "sam@gmail.com",
            isActive: true,
            gender: "Other",
            favoriteSubjects: ["Biology", "Chemistry"],
            grades: [
                { subject: "Biology", grade: 4 },
                { subject: "Chemistry", grade: 3 }
            ]
        },
        {
            name: "Robin",
            age: 34,
            email: "robin@gmail.com",
            isActive: true,
            gender: "Other",
            favoriteSubjects: ["Biology", "Chemistry"],
            grades: [
                { subject: "Biology", grade: 1 },
                { subject: "Chemistry", grade: 5 }
            ]
        }
    ]
}
