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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const config_dto_1 = require("./dtos/config.dto");
require("dotenv/config");
let ConfigService = class ConfigService {
    validatedConfig;
    constructor() {
        this.validatedConfig = this.validate(process.env);
    }
    validate(config) {
        const validatedConfig = (0, class_transformer_1.plainToInstance)(config_dto_1.ConfigDto, config, {
            enableImplicitConversion: true,
        });
        const errors = (0, class_validator_1.validateSync)(validatedConfig, {
            skipMissingProperties: false,
        });
        if (errors.length > 0) {
            throw new Error(errors.toString());
        }
        return validatedConfig;
    }
    get(key) {
        return this.validatedConfig[key];
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ConfigService);
//# sourceMappingURL=config.service.js.map