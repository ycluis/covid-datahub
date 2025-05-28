import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../utils/config/config.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class DataSyncService {
  private readonly logger = new Logger(DataSyncService.name);

  constructor(private readonly configService: ConfigService) {}

  @Cron('* * * * * *')
  handleCron() {
    this.logger.debug(this.configService.get('SUPABASE_URL'));
    this.logger.debug('Called when the current second is 0');
  }
}
