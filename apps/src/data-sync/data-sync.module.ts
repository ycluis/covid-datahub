import { Module } from '@nestjs/common';
import { DataSyncService } from './data-sync.service';
import { ConfigModule } from '../utils/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [DataSyncService],
})
export class DataSyncModule {}
