import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getGlobalStats(): Promise<{
        schoolsCount: number;
        studentsCount: number;
        totalRevenue: number;
        activeTenants: number;
    }>;
    getAllSchools(): Promise<import("../tenants/entities/school.entity").School[]>;
}
