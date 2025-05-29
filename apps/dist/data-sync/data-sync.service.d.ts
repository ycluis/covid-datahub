import { ConfigService } from '../utils/config/config.service';
import { CsvParserService } from 'src/csv-parser/csv-parser.service';
export declare class DataSyncService {
    private readonly configService;
    private readonly csvParserService;
    private readonly logger;
    constructor(configService: ConfigService, csvParserService: CsvParserService);
    handleCron(): Promise<void>;
}
