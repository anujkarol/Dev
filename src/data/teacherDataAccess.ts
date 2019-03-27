import {Log} from "../logger";
import {pool} from "./connection";

export class Teacher {
    public id: string;
    public name: string;
}

// tslint:disable-next-line:max-classes-per-file
export class TeacherDataAccess {

    public addTeacher(teacher: Teacher): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (teacher == null) {
                reject(Error("Teacher object is null"));
                return;
            }

            const qry = "INSERT into TEACHER(ID, Name) VALUES (?, ?)";

            pool.query(qry, [teacher.id, teacher.name], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                Log.info(`Result - ${JSON.stringify(result)}`);

                resolve(result && result.affectedRows && result.affectedRows > 0);
            });
        });
    }

    public deleteTeacher(teacher: Teacher): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (teacher == null) {
                reject(Error("Teacher object is null"));
                return;
            }

            const qry = "DELETE FROM TEACHER WHERE  id = ?;";

            pool.query(qry, [teacher.id], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                Log.info(`Result - ${JSON.stringify(result)}`);

                resolve(result && result.affectedRows && result.affectedRows > 0);
            });
        });
    }

    public getTeachersByIds(ids: string[]): Promise<Teacher[]> {

        return new Promise<Teacher[]>((resolve, reject) => {
            if (ids == null || ids.length <= 0 ) {
                reject(Error("Given ids is null or empty"));
                return;
            }
            const qry = "SELECT * from TEACHER where ID in (?)";

            pool.query(qry, [ids], (err, result, fields) => {

                if (err) {
                    reject(err);
                    return;
                }

                Log.info(`Result - ${JSON.stringify(result)}`);

                const teachers: Teacher[] = [];
                const convertedResult: any[] = result;

                convertedResult.forEach( i => {
                    const teacher =  new Teacher();
                    teacher.id = i.ID;
                    teacher.name =  i.NAME;
                    teachers.push(teacher);
                });

                resolve(teachers);
            });
        });
    }

    public isTeacherPresent(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {

            if (id == null || id === "") {
                reject(Error("Name is null or empty"));
                return;
            }

            const qry = "SELECT count(*) as cnt from TEACHER where ID = ?";
            pool.query(qry, [id] , (err, result, fields) => {
                if (err) {
                    Log.error(`isTeacherPresent - ${JSON.stringify(err)}`);
                    reject(err);
                    return;
                }
                // Log.info(`Result - ${JSON.stringify(result)}`);
                resolve(result && result.length > 0 && result[0].cnt > 0);

            });
        }) ;
    }
}
