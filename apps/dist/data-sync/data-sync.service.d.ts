import { ConfigService } from '../utils/config/config.service';
export declare class DataSyncService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    handleCron(): void;
}
