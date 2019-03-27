import { Student, StudentDataAccess } from "./data/studentDataAccess";
import {Teacher, TeacherDataAccess} from "./data/teacherDataAccess";
import {Log} from "./logger";

export class BaseService {
    public studentDA: StudentDataAccess;
    public teacherDA: TeacherDataAccess;

    constructor() {
        this.studentDA = new StudentDataAccess();
        this.teacherDA = new TeacherDataAccess();
    }

    public isTeacherPresent(name: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (name == null || name === "") {
                resolve(false);
                return;
            }
            this.teacherDA.isTeacherPresent(name).catch().catch(e => {
                Log.error(`Error in isTeacherPresent = ${JSON.stringify(e)}`);
                return false;
            }).then(v =>  resolve(v));
        });
    }

    public isStudentPresent(name: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (name == null || name === "") {
                resolve(false);
                return;
            }
            this.studentDA.isStudentPresent(name).catch(e => {
                Log.error(`Error in isStudentPresent = ${JSON.stringify(e)}`);
                return false;
            }).then(v => resolve(v));
        });
    }
}
