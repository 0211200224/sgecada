import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getRanking(classId: string): Promise<{
        id: string;
        name: string;
        average: number;
    }[]>;
    getStudentsAtRisk(): Promise<{
        name: string;
        average: number;
    }[]>;
    getFinancialSummary(): Promise<{
        totalCollected: number;
        paymentCount: number;
        recentPayments: import("../financial/entities/payment.entity").Payment[];
    }>;
}
