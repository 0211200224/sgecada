import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TenantsModule } from './tenants/tenants.module';
import { PermissionsModule } from './permissions/permissions.module';
import { DatabaseModule } from './database/database.module';
import { QueueModule } from './queue/queue.module';
import { AuditModule } from './audit/audit.module';
import { TenantMiddleware } from './shared/middleware/tenant.middleware';
import { StudentsModule } from './students/students.module';
import { PedagogicalModule } from './pedagogical/pedagogical.module';
import { FinancialModule } from './financial/financial.module';
import { ReportsModule } from './reports/reports.module';
import { SharedModule } from './shared/shared.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { HrModule } from './hr/hr.module';
import { MediaModule } from './media/media.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    TenantsModule,
    PermissionsModule,
    DatabaseModule,
    QueueModule,
    AuditModule,
    StudentsModule,
    PedagogicalModule,
    FinancialModule,
    ReportsModule,
    AnalyticsModule,
    ConfigurationModule,
    HrModule,
    MediaModule,
    NotificationsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
