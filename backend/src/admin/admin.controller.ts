import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @Roles(UserRole.PLATFORM_ADMIN)
  getGlobalStats() {
    return this.adminService.getGlobalStats();
  }

  @Get('schools')
  @Roles(UserRole.PLATFORM_ADMIN)
  getAllSchools() {
    return this.adminService.getAllSchools();
  }
}
