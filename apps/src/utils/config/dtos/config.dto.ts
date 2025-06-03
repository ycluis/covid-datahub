import { IsString } from 'class-validator';

export class ConfigDto {
  @IsString()
  SUPABASE_URL: string;

  @IsString()
  SUPABASE_SERVICE_ROLE_KEY: string;

  @IsString()
  SUPABASE_CASE_MALAYSIA: string;

  @IsString()
  CASE_MALAYSIA_URL: string;

  @IsString()
  CASE_STATE_URL: string;
}
