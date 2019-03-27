import {Log } from "../logger";
import {pool} from "./connection";

export class Allocation {
    public teacherId: string;
    public studentId: string;
}

// tslint:disable-next-line:max-classes-per-file
export class AllocationDataAccess {

    public addAllocation(allocation: Allocation): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (allocation == null) {
                reject(Error("Allocation object is null"));
                return;
            }

            const qry = "INSERT into STUDENT_ALLOCATION(TEACHER_ID, STUDENT_ID) VALUES (?, ?)";

            pool.query(qry, [allocation.teacherId, allocation.studentId], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                Log.info(`Result - ${JSON.stringify(result)}`);

                resolve(result && result.affectedRows && result.affectedRows > 0);
            });
        });
    }

    public deleteAllocation(allocation: Allocation): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (allocation == null) {
                reject(Error("Allocation object is null"));
                return;
            }

            const qry = "DELETE FROM STUDENT_ALLOCATION WHERE  TEACHER_ID = ? AND STUDENT_ID = ?;";

            pool.query(qry, [allocation.teacherId, allocation.studentId], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                Log.info(`Result - ${JSON.stringify(result)}`);

                resolve(result && result.affectedRows && result.affectedRows > 0);
            });
        });
    }

    public getAllocationForTeacherId(id: string): Promise<string[]> {

        return new Promise<string[]>((resolve, reject) => {
            if (id == null) {
                reject(Error("Given id is null or empty"));
                return;
            }
            const qry = "SELECT * from STUDENT_ALLOCATION where TEACHER_ID = ?";

            pool.query(qry, [id], (err, result, fields) => {

                if (err) {
                    reject(err);
                    return;
                }

                Log.info(`Result - ${JSON.stringify(result)}`);

                const students: string[] = [];
                const convertedResult: any[] = result;

                convertedResult.forEach(i => students.push(i.STUDENT_ID) );

                resolve(students);
            });
        });
    }

    public isAllocationPresent(teacherId: string, studentId: string): Promise<boolean> {
        return new Promise((resolve, reject) => {

            if (teacherId == null || teacherId === "") {
                reject(Error("teacher id is null or empty"));
                return;
            }

            if (studentId == null || studentId === "") {
                reject(Error("student id is null or empty"));
                return;
            }

            const qry = "SELECT count(*) as cnt from STUDENT_ALLOCATION where TEACHER_ID = ? AND STUDENT_ID = ?";
            pool.query(qry, [teacherId, studentId] , (err, result, fields) => {
                if (err) {
                    Log.error(`isAllocationPresent - ${JSON.stringify(err)}`);
                    reject(err);
                    return;
                }
                // Log.info(`Result - ${JSON.stringify(result)}`);
                resolve(result && result.length > 0 && result[0].cnt > 0);

            });
        }) ;
    }

    public commonStudents(teachers: string[]): Promise<string[]> {
       return new Promise<string[]>((resolve, reject) => {
           if (teachers == null || teachers.length <= 0) {
               return resolve([]);
           }
           const qry = "SELECT STUDENT_ID FROM STUDENT_ALLOCATION WHERE TEACHER_ID IN (?) " +
               "GROUP BY STUDENT_ID HAVING COUNT(*) = ?";

           pool.query(qry, [teachers, teachers.length], (err, result, fields) => {
               if (err) {
                   Log.error(`commonStudents - ${JSON.stringify(err)}`);
                   reject(err);
                   return;
               }
               const students: string[] = [];
               const convertedResult: any[] = result;

               convertedResult.forEach(i => students.push(i.STUDENT_ID));
               resolve(students);
           });
       });
    }
}
