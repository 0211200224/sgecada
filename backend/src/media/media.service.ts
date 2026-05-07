import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MediaService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL')!,
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY')!
    );
  }

  async uploadFile(
    school_id: string,
    folder: 'photos' | 'docs',
    file: Express.Multer.File
  ) {
    const fileName = `${school_id}/${folder}/${Date.now()}-${file.originalname}`;
    
    const { data, error } = await this.supabase.storage
      .from('sge-media')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true
      });

    if (error) throw error;

    const { data: urlData } = this.supabase.storage
      .from('sge-media')
      .getPublicUrl(fileName);

    return { url: urlData.publicUrl, path: fileName };
  }
}
