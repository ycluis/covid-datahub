import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '../utils/config/config.service';
import { CsvParserService } from 'src/csv-parser/csv-parser.service';

@Injectable()
export class DataSyncService {
  private readonly logger = new Logger(DataSyncService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly csvParserService: CsvParserService,
  ) {}

  @Cron('9 20 * * *')
  async handleCron() {
    this.logger.debug(this.configService.get('SUPABASE_URL'));
    this.logger.debug('Called when the current second is 0');

    const records = await this.csvParserService.parseFromUrl(
      this.configService.get('CASE_MALAYSIA_URL'),
    );

    this.logger.debug(records.slice(0, 3));
  }
}
