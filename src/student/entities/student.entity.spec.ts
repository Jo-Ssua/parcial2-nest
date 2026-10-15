import { Student } from "./student.entity";

describe("Student entity - nickname", () => {
    let student: Student;

    beforeEach(() => {
        student = new Student();
        student.name = "Gustavo Gonzalez";
        student.age = 35;
    })

    it("Genera el nickname a partir del nombre si no viene", ()=>{
        //Act
        student.checkNicknameInsert();

        //Assert
        expect(student.nickname).toBe("gustavo_gonzalez35")
    });

    it("se respeta el nickname que se envia", ()=>{
        //Arrange
        student.nickname = "ElProfeGus";

        //Act
        student.checkNicknameInsert();

        //Assert
        expect(student.nickname).toBe("elprofegus35");
    })

    it("reemplaza TODOS los espacios por _", ()=>{
        //Arrange
        student.name = "Juan Carlos Perez";
        student.age = 23;

        //Act
        student.checkNicknameInsert();

        //Assert
        expect(student.nickname).toBe("juan_carlos_perez23");
    })

})