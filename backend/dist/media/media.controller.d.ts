import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    uploadFile(file: Express.Multer.File, folder: 'photos' | 'docs', req: any): Promise<{
        url: string;
        path: string;
    }>;
}
