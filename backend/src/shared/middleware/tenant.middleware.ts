import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let schoolId = req.headers['x-school-id'] as string;
    let userRole = req.headers['x-user-role'] as string || 'student';

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const payload = this.jwtService.decode(token) as any;
        if (payload) {
          schoolId = payload.school_id || schoolId;
          userRole = payload.role || userRole;
        }
      } catch (e) {
        // Token invalid or decode failed, fallback to headers or default
      }
    }

    if (schoolId) {
      // Set session variables for RLS
      await this.dataSource.query(`SET app.current_school_id = '${schoolId}'`);
      await this.dataSource.query(`SET app.user_role = '${userRole}'`);
    }

    next();
  }
}
