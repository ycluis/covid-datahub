import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './utils/config/config.module';
import { DataSyncModule } from './data-sync/data-sync.module';
import { CsvParserModule } from './csv-parser/csv-parser.module';

@Module({
  imports: [ScheduleModule.forRoot(), ConfigModule, DataSyncModule, CsvParserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
