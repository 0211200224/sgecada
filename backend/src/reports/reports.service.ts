import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class ReportsService {
  constructor(@InjectQueue('reports') private reportQueue: Queue) {}

  async requestReport(schoolId: string, type: string) {
    const job = await this.reportQueue.add('generate', {
      schoolId,
      type,
      requestedAt: new Date().toISOString(),
    });

    return {
      jobId: job.id,
      status: 'queued',
    };
  }

  async getJobStatus(jobId: string) {
    const job = await this.reportQueue.getJob(jobId);
    if (!job) return null;

    return {
      id: job.id,
      status: await job.getState(),
      result: job.returnvalue,
      progress: job.progress,
    };
  }
}
