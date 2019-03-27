import {Log } from "../logger";
import {pool} from "./connection";

export class Student {
    public id: string;
    public name: string;
    public active: number;

}

// tslint:disable-next-line:max-classes-per-file
export class StudentDataAccess {

    public addStudent(student: Student): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (student == null) {
                reject(Error("Student object is null"));
                return;
            }

            const qry = "INSERT into STUDENT(ID, Name, Active) VALUES (?, ?, ?)";

            pool.query(qry, [student.id, student.name, student.active], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                Log.info(`Result - ${JSON.stringify(result)}`);

                resolve(result  != null && result.affectedRows != null && result.affectedRows > 0);
            });
        });
    }

    public deleteStudent(student: Student): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (student == null) {
                reject(Error("Student object is null"));
                return;
            }

            const qry = "DELETE FROM STUDENT WHERE  id = ?;";

            pool.query(qry, [student.id], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                Log.info(`Result - ${JSON.stringify(result)}`);

                resolve(result != null && result.affectedRows != null && result.affectedRows > 0);
            });
        });
    }

    public getStudentsByIds(ids: string[]): Promise<Student[]> {

        return new Promise<Student[]>((resolve, reject) => {
            if (ids == null || ids.length <= 0 ) {
                reject(Error("Given ids is null or empty"));
                return;
            }
            const qry = "SELECT * from STUDENT where ID in (?)";

            pool.query(qry, [ids], (err, result, fields) => {

                if (err) {
                    reject(err);
                    return;
                }

                Log.info(`Result - ${JSON.stringify(result)}`);

                const students: Student[] = [];
                const convertedResult: any[] = result;

                convertedResult.forEach( i => {
                    const student =  new Student();
                    student.id = i.ID;
                    student.name =  i.Name;
                    student.active =  i.Active;

                    students.push(student);
                });

                resolve(students);
            });
        });
    }

    public isStudentPresent(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {

            if (id == null || id === "") {
                reject(Error("Name is null or empty"));
                return;
            }

            const qry = "SELECT count(*) as cnt from STUDENT where ID = ?";
            pool.query(qry, [id] , (err, result, fields) => {
                if (err) {
                    Log.error(`isStudentPresent - ${JSON.stringify(err)}`);
                    reject(err);
                    return;
                }
                // Log.info(`Result - ${JSON.stringify(result)}`);
                resolve(result && result.length > 0 && result[0].cnt > 0);

            });
        }) ;
    }

    public suspendStudent(id: string): Promise<boolean> {
        return new Promise( (resolve, reject) => {
            if (id == null || id === "") {
                reject("ID is null or empty");
                return;
            }

            const qry = "update STUDENT set ACTIVE = 0 WHERE ID = ? ";

            pool.query(qry, [id], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                Log.info(`Result - ${JSON.stringify(result)}`);

                resolve(result != null && result.affectedRows != null && result.affectedRows > 0);
            });
        });
    }
}
