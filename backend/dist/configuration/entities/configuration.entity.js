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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolConfig = void 0;
const typeorm_1 = require("typeorm");
let SchoolConfig = class SchoolConfig {
    id;
    school_id;
    grading_system;
    academic_period;
    passing_grade;
    late_fee_percentage;
    currency;
    branding;
    created_at;
    updated_at;
};
exports.SchoolConfig = SchoolConfig;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SchoolConfig.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', unique: true }),
    __metadata("design:type", String)
], SchoolConfig.prototype, "school_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '0-20' }),
    __metadata("design:type", String)
], SchoolConfig.prototype, "grading_system", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'trimestral' }),
    __metadata("design:type", String)
], SchoolConfig.prototype, "academic_period", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 10.0 }),
    __metadata("design:type", Number)
], SchoolConfig.prototype, "passing_grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 5.0 }),
    __metadata("design:type", Number)
], SchoolConfig.prototype, "late_fee_percentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'MT' }),
    __metadata("design:type", String)
], SchoolConfig.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], SchoolConfig.prototype, "branding", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SchoolConfig.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SchoolConfig.prototype, "updated_at", void 0);
exports.SchoolConfig = SchoolConfig = __decorate([
    (0, typeorm_1.Entity)('school_configurations')
], SchoolConfig);
//# sourceMappingURL=configuration.entity.js.map