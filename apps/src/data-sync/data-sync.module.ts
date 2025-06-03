import { Module } from '@nestjs/common';
import { DataSyncService } from './data-sync.service';
import { ConfigModule } from '../utils/config/config.module';
import { CsvParserModule } from '../csv-parser/csv-parser.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [ConfigModule, CsvParserModule, SupabaseModule],
  providers: [DataSyncService],
  exports: [DataSyncService],
})
export class DataSyncModule {}
