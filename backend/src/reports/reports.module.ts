import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { QueueModule } from '../queue/queue.module';
import { ReportProcessor } from './processors/report.processor';

@Module({
  imports: [
    QueueModule,
    BullModule.registerQueue({
      name: 'reports',
    }),
  ],
  controllers: [ReportsController],
  providers: [ReportsService, ReportProcessor],
})
export class ReportsModule {}
