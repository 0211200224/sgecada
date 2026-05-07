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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("../students/entities/student.entity");
const grade_entity_1 = require("../pedagogical/entities/grade.entity");
const payment_entity_1 = require("../financial/entities/payment.entity");
let AnalyticsService = class AnalyticsService {
    studentRepository;
    gradeRepository;
    paymentRepository;
    constructor(studentRepository, gradeRepository, paymentRepository) {
        this.studentRepository = studentRepository;
        this.gradeRepository = gradeRepository;
        this.paymentRepository = paymentRepository;
    }
    async getStudentRanking(classId) {
        const students = await this.studentRepository.find({
            where: { class_id: classId },
            relations: ['grades'],
        });
        const ranking = students.map(student => {
            const grades = student.grades || [];
            const avg = grades.length > 0
                ? grades.reduce((sum, g) => sum + Number(g.value), 0) / grades.length
                : 0;
            return {
                id: student.id,
                name: `${student.first_name} ${student.last_name}`,
                average: Number(avg.toFixed(2)),
            };
        });
        return ranking.sort((a, b) => b.average - a.average);
    }
    async getStudentsAtRisk() {
        const threshold = 10;
        const grades = await this.gradeRepository.find({ relations: ['student'] });
        const studentGrades = {};
        grades.forEach(g => {
            if (!studentGrades[g.student_id]) {
                studentGrades[g.student_id] = { sum: 0, count: 0, student: g.student };
            }
            studentGrades[g.student_id].sum += Number(g.value);
            studentGrades[g.student_id].count++;
        });
        return Object.values(studentGrades)
            .map((data) => ({
            name: `${data.student.first_name} ${data.student.last_name}`,
            average: data.sum / data.count,
        }))
            .filter(s => s.average < threshold);
    }
    async getFinancialSummary() {
        const payments = await this.paymentRepository.find();
        const totalCollected = payments.reduce((sum, p) => sum + Number(p.amount_paid), 0);
        const recentPayments = payments.slice(-5).reverse();
        return {
            totalCollected,
            paymentCount: payments.length,
            recentPayments,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(grade_entity_1.Grade)),
    __param(2, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map