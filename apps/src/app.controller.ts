import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSyncService } from './jobs/data-sync/data-sync.service';
import { AuthGuard } from './auth/auth.guard';

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
  @UseGuards(AuthGuard)
  async syncData() {
    const result = await this.dataSyncService.handleCron();
    return JSON.stringify(result);
  }
}
