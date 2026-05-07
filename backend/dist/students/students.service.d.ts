import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { UsersService } from '../users/users.service';
export declare class StudentsService {
    private studentRepository;
    private usersService;
    constructor(studentRepository: Repository<Student>, usersService: UsersService);
    create(data: any, schoolId: string): Promise<Student>;
    findAll(): Promise<Student[]>;
    findOne(id: string): Promise<Student | null>;
}
