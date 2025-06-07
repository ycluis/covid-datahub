import { IsString } from 'class-validator';

export class ConfigDto {
  @IsString()
  SUPABASE_URL: string;

  @IsString()
  SUPABASE_SERVICE_ROLE_KEY: string;

  @IsString()
  SUPABASE_DB_TABLE_CASES_MY: string;

  @IsString()
  CASES_MY_DATA_URL: string;
}
