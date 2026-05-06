import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TenantsModule } from './tenants/tenants.module';
import { PermissionsModule } from './permissions/permissions.module';
import { DatabaseModule } from './database/database.module';
import { QueueModule } from './queue/queue.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [AuthModule, UsersModule, TenantsModule, PermissionsModule, DatabaseModule, QueueModule, AuditModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
