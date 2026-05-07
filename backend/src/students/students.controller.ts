import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @Roles(UserRole.DIRECTOR)
  create(@Body() data: any, @Request() req) {
    return this.studentsService.create(data, req.user.school_id);
  }

  @Get()
  @Roles(UserRole.DIRECTOR, UserRole.PROFESSOR)
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.DIRECTOR, UserRole.PROFESSOR)
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }
}
