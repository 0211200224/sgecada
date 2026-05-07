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
exports.Fee = void 0;
const typeorm_1 = require("typeorm");
const tenant_entity_1 = require("../../shared/entities/tenant.entity");
let Fee = class Fee extends tenant_entity_1.TenantEntity {
    name;
    amount;
    frequency;
    is_active;
};
exports.Fee = Fee;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Fee.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Fee.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'monthly' }),
    __metadata("design:type", String)
], Fee.prototype, "frequency", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Fee.prototype, "is_active", void 0);
exports.Fee = Fee = __decorate([
    (0, typeorm_1.Entity)('fees')
], Fee);
//# sourceMappingURL=fee.entity.js.map