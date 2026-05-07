import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('ranking/class/:classId')
  @Roles(UserRole.DIRECTOR, UserRole.PROFESSOR)
  getRanking(@Param('classId') classId: string) {
    return this.analyticsService.getStudentRanking(classId);
  }

  @Get('risk')
  @Roles(UserRole.DIRECTOR, UserRole.PROFESSOR)
  getStudentsAtRisk() {
    return this.analyticsService.getStudentsAtRisk();
  }

  @Get('financial-summary')
  @Roles(UserRole.DIRECTOR)
  getFinancialSummary() {
    return this.analyticsService.getFinancialSummary();
  }
}
