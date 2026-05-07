"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ReportProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
let ReportProcessor = ReportProcessor_1 = class ReportProcessor extends bullmq_1.WorkerHost {
    logger = new common_1.Logger(ReportProcessor_1.name);
    async process(job) {
        this.logger.log(`Processing report job ${job.id} for school ${job.data.schoolId}...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
        this.logger.log(`Report job ${job.id} completed!`);
        return {
            url: `https://storage.sgecada.edu/reports/report-${job.id}.pdf`,
            generatedAt: new Date().toISOString(),
        };
    }
};
exports.ReportProcessor = ReportProcessor;
exports.ReportProcessor = ReportProcessor = ReportProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('reports')
], ReportProcessor);
//# sourceMappingURL=report.processor.js.map