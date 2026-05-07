import { Controller, Post, Get, Param, UseGuards, Request, Body } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('request')
  @Roles(UserRole.DIRECTOR, UserRole.PROFESSOR)
  async requestReport(@Request() req, @Body('type') type: string) {
    return this.reportsService.requestReport(req.user.school_id, type || 'general');
  }

  @Get('status/:id')
  @Roles(UserRole.DIRECTOR, UserRole.PROFESSOR)
  async getStatus(@Param('id') id: string) {
    return this.reportsService.getJobStatus(id);
  }
}
