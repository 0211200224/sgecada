import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    requestReport(req: any, type: string): Promise<{
        jobId: string | undefined;
        status: string;
    }>;
    getStatus(id: string): Promise<{
        id: string | undefined;
        status: import("bullmq").JobState | "unknown";
        result: any;
        progress: import("bullmq").JobProgress;
    } | null>;
}
