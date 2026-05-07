import { PedagogicalService } from './pedagogical.service';
export declare class PedagogicalController {
    private readonly pedagogicalService;
    constructor(pedagogicalService: PedagogicalService);
    createClass(data: any, req: any): Promise<import("./entities/class.entity").SchoolClass[]>;
    findAllClasses(): Promise<import("./entities/class.entity").SchoolClass[]>;
    createGrade(data: any, req: any): Promise<import("./entities/grade.entity").Grade[]>;
    findGradesByStudent(studentId: string, req: any): Promise<import("./entities/grade.entity").Grade[]>;
}
