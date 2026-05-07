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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const school_entity_1 = require("../tenants/entities/school.entity");
const student_entity_1 = require("../students/entities/student.entity");
const payment_entity_1 = require("../financial/entities/payment.entity");
let AdminService = class AdminService {
    schoolRepo;
    studentRepo;
    paymentRepo;
    constructor(schoolRepo, studentRepo, paymentRepo) {
        this.schoolRepo = schoolRepo;
        this.studentRepo = studentRepo;
        this.paymentRepo = paymentRepo;
    }
    async getGlobalStats() {
        const schoolsCount = await this.schoolRepo.count();
        const studentsCount = await this.studentRepo.count();
        const payments = await this.paymentRepo.find();
        const totalRevenue = payments.reduce((acc, curr) => acc + Number(curr.amount_paid), 0);
        return {
            schoolsCount,
            studentsCount,
            totalRevenue,
            activeTenants: schoolsCount
        };
    }
    async getAllSchools() {
        return this.schoolRepo.find({ order: { created_at: 'DESC' } });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(school_entity_1.School)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map