import { ConfigService } from '@nestjs/config';
export declare class MediaService {
    private configService;
    private supabase;
    constructor(configService: ConfigService);
    uploadFile(school_id: string, folder: 'photos' | 'docs', file: Express.Multer.File): Promise<{
        url: string;
        path: string;
    }>;
}
