import { Injectable, Logger } from '@nestjs/common';
// import { Cron } from '@nestjs/schedule';
import { ConfigService } from '../utils/config/config.service';
import { CsvParserService } from 'src/csv-parser/csv-parser.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { validateCsvHeaders, normalizeCsvRow } from 'src/utils/normalize.util';
import { CASES_MALAYSIA_HEADERS } from 'src/utils/csv-schema.constant';

@Injectable()
export class DataSyncService {
  private readonly logger = new Logger(DataSyncService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly csvParserService: CsvParserService,
    private readonly supabaseService: SupabaseService,
  ) {}

  // @Cron('43 10 * * *')
  async handleCron(): Promise<{ success: boolean }> {
    const records = await this.csvParserService.parseFromUrl(
      this.configService.get('CASE_MALAYSIA_URL'),
    );

    this.logger.debug(`Parsed ${records.length} records`);

    if (records.length > 0) {
      validateCsvHeaders(records[0], CASES_MALAYSIA_HEADERS);
    }

    const normalizedRecords = records.map(normalizeCsvRow);

    await this.supabaseService.upsert(
      this.configService.get('SUPABASE_CASE_MALAYSIA'),
      normalizedRecords,
    );

    this.logger.debug('✅ Data successfully upserted into Supabase');
    return { success: true };
  }
}
