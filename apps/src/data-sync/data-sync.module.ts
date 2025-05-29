import { Module } from '@nestjs/common';
import { DataSyncService } from './data-sync.service';
import { ConfigModule } from '../utils/config/config.module';
import { CsvParserModule } from '../csv-parser/csv-parser.module';

@Module({
  imports: [ConfigModule, CsvParserModule],
  providers: [DataSyncService],
})
export class DataSyncModule {}
