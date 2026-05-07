import { Repository } from 'typeorm';
import { SchoolClass } from './entities/class.entity';
import { Grade } from './entities/grade.entity';
export declare class PedagogicalService {
    private classRepository;
    private gradeRepository;
    constructor(classRepository: Repository<SchoolClass>, gradeRepository: Repository<Grade>);
    createClass(data: any, schoolId: string): Promise<SchoolClass[]>;
    findAllClasses(): Promise<SchoolClass[]>;
    createGrade(data: any, schoolId: string): Promise<Grade[]>;
    findGradesByStudent(studentId: string): Promise<Grade[]>;
}
