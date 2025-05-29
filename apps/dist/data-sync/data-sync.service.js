"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DataSyncService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSyncService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const config_service_1 = require("../utils/config/config.service");
const csv_parser_service_1 = require("../csv-parser/csv-parser.service");
let DataSyncService = DataSyncService_1 = class DataSyncService {
    configService;
    csvParserService;
    logger = new common_1.Logger(DataSyncService_1.name);
    constructor(configService, csvParserService) {
        this.configService = configService;
        this.csvParserService = csvParserService;
    }
    async handleCron() {
        this.logger.debug(this.configService.get('SUPABASE_URL'));
        this.logger.debug('Called when the current second is 0');
        const records = await this.csvParserService.parseFromUrl(this.configService.get('CASE_MALAYSIA_URL'));
        this.logger.debug(records.slice(0, 3));
    }
};
exports.DataSyncService = DataSyncService;
__decorate([
    (0, schedule_1.Cron)('9 20 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataSyncService.prototype, "handleCron", null);
exports.DataSyncService = DataSyncService = DataSyncService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        csv_parser_service_1.CsvParserService])
], DataSyncService);
//# sourceMappingURL=data-sync.service.js.map