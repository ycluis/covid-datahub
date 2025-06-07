import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './utils/config/config.module';
import { DataSyncModule } from './jobs/data-sync/data-sync.module';
import { CsvParserModule } from './utils/csv-parser/csv-parser.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule,
    DataSyncModule,
    CsvParserModule,
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
