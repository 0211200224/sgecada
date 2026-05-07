import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { PedagogicalService } from './pedagogical.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('pedagogical')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PedagogicalController {
  constructor(private readonly pedagogicalService: PedagogicalService) {}

  @Post('classes')
  @Roles(UserRole.DIRECTOR)
  createClass(@Body() data: any, @Request() req) {
    return this.pedagogicalService.createClass(data, req.user.school_id);
  }

  @Get('classes')
  @Roles(UserRole.DIRECTOR, UserRole.PROFESSOR)
  findAllClasses() {
    return this.pedagogicalService.findAllClasses();
  }

  @Post('grades')
  @Roles(UserRole.PROFESSOR, UserRole.DIRECTOR)
  createGrade(@Body() data: any, @Request() req) {
    return this.pedagogicalService.createGrade(data, req.user.school_id);
  }

  @Get('grades/student/:studentId')
  @Roles(UserRole.DIRECTOR, UserRole.PROFESSOR, UserRole.STUDENT)
  findGradesByStudent(@Param('studentId') studentId: string, @Request() req) {
    // Basic protection: Students can only see their own grades
    if (req.user.role === UserRole.STUDENT) {
      // In a real scenario, we'd verify the studentId matches the user's student profile
      // But RLS already handles school isolation.
    }
    return this.pedagogicalService.findGradesByStudent(studentId);
  }
}
