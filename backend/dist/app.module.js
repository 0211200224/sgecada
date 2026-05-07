"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const tenants_module_1 = require("./tenants/tenants.module");
const permissions_module_1 = require("./permissions/permissions.module");
const database_module_1 = require("./database/database.module");
const queue_module_1 = require("./queue/queue.module");
const audit_module_1 = require("./audit/audit.module");
const tenant_middleware_1 = require("./shared/middleware/tenant.middleware");
const students_module_1 = require("./students/students.module");
const pedagogical_module_1 = require("./pedagogical/pedagogical.module");
const financial_module_1 = require("./financial/financial.module");
const reports_module_1 = require("./reports/reports.module");
const analytics_module_1 = require("./analytics/analytics.module");
const configuration_module_1 = require("./configuration/configuration.module");
const hr_module_1 = require("./hr/hr.module");
const media_module_1 = require("./media/media.module");
const notifications_module_1 = require("./notifications/notifications.module");
const admin_module_1 = require("./admin/admin.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(tenant_middleware_1.TenantMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            tenants_module_1.TenantsModule,
            permissions_module_1.PermissionsModule,
            database_module_1.DatabaseModule,
            queue_module_1.QueueModule,
            audit_module_1.AuditModule,
            students_module_1.StudentsModule,
            pedagogical_module_1.PedagogicalModule,
            financial_module_1.FinancialModule,
            reports_module_1.ReportsModule,
            analytics_module_1.AnalyticsModule,
            configuration_module_1.ConfigurationModule,
            hr_module_1.HrModule,
            media_module_1.MediaModule,
            notifications_module_1.NotificationsModule,
            admin_module_1.AdminModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map