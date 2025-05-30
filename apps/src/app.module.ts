import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './utils/config/config.module';
import { DataSyncModule } from './data-sync/data-sync.module';
import { CsvParserModule } from './csv-parser/csv-parser.module';
import { SupabaseService } from './supabase/supabase.service';
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
  providers: [AppService, SupabaseService],
})
export class AppModule {}
