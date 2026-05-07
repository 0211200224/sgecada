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
exports.PedagogicalController = void 0;
const common_1 = require("@nestjs/common");
const pedagogical_service_1 = require("./pedagogical.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let PedagogicalController = class PedagogicalController {
    pedagogicalService;
    constructor(pedagogicalService) {
        this.pedagogicalService = pedagogicalService;
    }
    createClass(data, req) {
        return this.pedagogicalService.createClass(data, req.user.school_id);
    }
    findAllClasses() {
        return this.pedagogicalService.findAllClasses();
    }
    createGrade(data, req) {
        return this.pedagogicalService.createGrade(data, req.user.school_id);
    }
    findGradesByStudent(studentId, req) {
        if (req.user.role === user_entity_1.UserRole.STUDENT) {
        }
        return this.pedagogicalService.findGradesByStudent(studentId);
    }
};
exports.PedagogicalController = PedagogicalController;
__decorate([
    (0, common_1.Post)('classes'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.DIRECTOR),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PedagogicalController.prototype, "createClass", null);
__decorate([
    (0, common_1.Get)('classes'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.DIRECTOR, user_entity_1.UserRole.PROFESSOR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PedagogicalController.prototype, "findAllClasses", null);
__decorate([
    (0, common_1.Post)('grades'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.PROFESSOR, user_entity_1.UserRole.DIRECTOR),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PedagogicalController.prototype, "createGrade", null);
__decorate([
    (0, common_1.Get)('grades/student/:studentId'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.DIRECTOR, user_entity_1.UserRole.PROFESSOR, user_entity_1.UserRole.STUDENT),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PedagogicalController.prototype, "findGradesByStudent", null);
exports.PedagogicalController = PedagogicalController = __decorate([
    (0, common_1.Controller)('pedagogical'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [pedagogical_service_1.PedagogicalService])
], PedagogicalController);
//# sourceMappingURL=pedagogical.controller.js.map