import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('configuration')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConfigurationController {
  constructor(private readonly configService: ConfigurationService) {}

  @Get()
  @Roles(UserRole.DIRECTOR)
  getConfig(@Request() req) {
    return this.configService.getConfig(req.user.school_id);
  }

  @Patch()
  @Roles(UserRole.DIRECTOR)
  updateConfig(@Request() req, @Body() data: any) {
    return this.configService.updateConfig(req.user.school_id, data);
  }
}
