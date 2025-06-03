import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSyncService } from './data-sync/data-sync.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly dataSyncService: DataSyncService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sync')
  async syncData() {
    const result = await this.dataSyncService.handleCron();
    return JSON.stringify(result);
  }
}
