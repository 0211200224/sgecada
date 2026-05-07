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
exports.FinancialService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fee_entity_1 = require("./entities/fee.entity");
const payment_entity_1 = require("./entities/payment.entity");
let FinancialService = class FinancialService {
    feeRepository;
    paymentRepository;
    constructor(feeRepository, paymentRepository) {
        this.feeRepository = feeRepository;
        this.paymentRepository = paymentRepository;
    }
    async createFee(data, schoolId) {
        const fee = this.feeRepository.create({
            ...data,
            school_id: schoolId,
        });
        return this.feeRepository.save(fee);
    }
    async findAllFees() {
        return this.feeRepository.find();
    }
    async createPayment(data, schoolId) {
        const payment = this.paymentRepository.create({
            ...data,
            school_id: schoolId,
        });
        return this.paymentRepository.save(payment);
    }
    async findAllPayments() {
        return this.paymentRepository.find({
            relations: ['student', 'fee'],
        });
    }
    async findPaymentsByStudent(studentId) {
        return this.paymentRepository.find({
            where: { student_id: studentId },
            relations: ['fee'],
        });
    }
};
exports.FinancialService = FinancialService;
exports.FinancialService = FinancialService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(fee_entity_1.Fee)),
    __param(1, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FinancialService);
//# sourceMappingURL=financial.service.js.map