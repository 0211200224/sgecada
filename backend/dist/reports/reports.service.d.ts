import { Queue } from 'bullmq';
export declare class ReportsService {
    private reportQueue;
    constructor(reportQueue: Queue);
    requestReport(schoolId: string, type: string): Promise<{
        jobId: string | undefined;
        status: string;
    }>;
    getJobStatus(jobId: string): Promise<{
        id: string | undefined;
        status: import("bullmq").JobState | "unknown";
        result: any;
        progress: import("bullmq").JobProgress;
    } | null>;
}
