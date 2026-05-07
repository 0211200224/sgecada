"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedagogicalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_entity_1 = require("./entities/class.entity");
const grade_entity_1 = require("./entities/grade.entity");
let PedagogicalService = class PedagogicalService {
    classRepository;
    gradeRepository;
    constructor(classRepository, gradeRepository) {
        this.classRepository = classRepository;
        this.gradeRepository = gradeRepository;
    }
    async createClass(data, schoolId) {
        const schoolClass = this.classRepository.create({
            ...data,
            school_id: schoolId,
        });
        return this.classRepository.save(schoolClass);
    }
    async findAllClasses() {
        return this.classRepository.find();
    }
    async createGrade(data, schoolId) {
        const grade = this.gradeRepository.create({
            ...data,
            school_id: schoolId,
        });
        return this.gradeRepository.save(grade);
    }
    async findGradesByStudent(studentId) {
        return this.gradeRepository.find({
            where: { student_id: studentId },
            relations: ['student', 'school_class'],
        });
    }
};
exports.PedagogicalService = PedagogicalService;
exports.PedagogicalService = PedagogicalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(class_entity_1.SchoolClass)),
    __param(1, (0, typeorm_1.InjectRepository)(grade_entity_1.Grade)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PedagogicalService);
//# sourceMappingURL=pedagogical.service.js.map