import { ConfigDto } from './dtos/config.dto';
import 'dotenv/config';
export declare class ConfigService {
    private readonly validatedConfig;
    constructor();
    validate(config: Record<string, unknown>): ConfigDto;
    get<T extends keyof ConfigDto>(key: T): ConfigDto[T];
}
