import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class TenantMiddleware implements NestMiddleware {
    private dataSource;
    private jwtService;
    constructor(dataSource: DataSource, jwtService: JwtService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
