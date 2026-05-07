import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('reports')
export class ReportProcessor extends WorkerHost {
  private readonly logger = new Logger(ReportProcessor.name);

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing report job ${job.id} for school ${job.data.schoolId}...`);
    
    // Simulate heavy work
    await new Promise(resolve => setTimeout(resolve, 5000));

    this.logger.log(`Report job ${job.id} completed!`);
    
    return {
      url: `https://storage.sgecada.edu/reports/report-${job.id}.pdf`,
      generatedAt: new Date().toISOString(),
    };
  }
}
