"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("@nestjs/config");
let MediaService = class MediaService {
    configService;
    supabase;
    constructor(configService) {
        this.configService = configService;
        this.supabase = (0, supabase_js_1.createClient)(this.configService.get('SUPABASE_URL'), this.configService.get('SUPABASE_SERVICE_ROLE_KEY'));
    }
    async uploadFile(school_id, folder, file) {
        const fileName = `${school_id}/${folder}/${Date.now()}-${file.originalname}`;
        const { data, error } = await this.supabase.storage
            .from('sge-media')
            .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            upsert: true
        });
        if (error)
            throw error;
        const { data: urlData } = this.supabase.storage
            .from('sge-media')
            .getPublicUrl(fileName);
        return { url: urlData.publicUrl, path: fileName };
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MediaService);
//# sourceMappingURL=media.service.js.map