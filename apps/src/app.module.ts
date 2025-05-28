import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './utils/config/config.module';
import { DataSyncModule } from './data-sync/data-sync.module';

@Module({
  imports: [ScheduleModule.forRoot(), ConfigModule, DataSyncModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
