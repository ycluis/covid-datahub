import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import { ConfigDto } from './dtos/config.dto';
import 'dotenv/config';

@Injectable()
export class ConfigService {
  private readonly validatedConfig: ConfigDto;

  constructor() {
    this.validatedConfig = this.validate(process.env);
  }

  validate(config: Record<string, unknown>): ConfigDto {
    const validatedConfig = plainToInstance(ConfigDto, config, {
      enableImplicitConversion: true,
    });

    const errors: ValidationError[] = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return validatedConfig;
  }

  get<T extends keyof ConfigDto>(key: T): ConfigDto[T] {
    return this.validatedConfig[key];
  }
}
