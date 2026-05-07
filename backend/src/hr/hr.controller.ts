import { Controller, Get, Post, Body, UseGuards, Request, Query } from '@nestjs/common';
import { HrService } from './hr.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('hr')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Post('employees')
  @Roles(UserRole.DIRECTOR)
  createEmployee(@Body() data: any, @Request() req) {
    return this.hrService.createEmployee(data, req.user.school_id);
  }

  @Get('employees')
  @Roles(UserRole.DIRECTOR)
  findAllEmployees(@Request() req) {
    return this.hrService.findAllEmployees(req.user.school_id);
  }

  @Post('payroll/generate')
  @Roles(UserRole.DIRECTOR)
  generatePayroll(@Body() data: { month: number; year: number }, @Request() req) {
    return this.hrService.generateMonthlyPayroll(req.user.school_id, data.month, data.year);
  }

  @Get('payroll')
  @Roles(UserRole.DIRECTOR)
  findAllPayrolls(@Request() req) {
    return this.hrService.findAllPayrolls(req.user.school_id);
  }
}
