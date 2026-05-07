import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('financial')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @Post('fees')
  @Roles(UserRole.DIRECTOR)
  createFee(@Body() data: any, @Request() req) {
    return this.financialService.createFee(data, req.user.school_id);
  }

  @Get('fees')
  @Roles(UserRole.DIRECTOR, UserRole.PROFESSOR)
  findAllFees() {
    return this.financialService.findAllFees();
  }

  @Post('payments')
  @Roles(UserRole.DIRECTOR)
  createPayment(@Body() data: any, @Request() req) {
    return this.financialService.createPayment(data, req.user.school_id);
  }

  @Get('payments')
  @Roles(UserRole.DIRECTOR)
  findAllPayments() {
    return this.financialService.findAllPayments();
  }

  @Get('payments/student/:studentId')
  @Roles(UserRole.DIRECTOR, UserRole.STUDENT)
  findPaymentsByStudent(@Param('studentId') studentId: string) {
    return this.financialService.findPaymentsByStudent(studentId);
  }
}
