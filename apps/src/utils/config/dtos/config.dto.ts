import { IsString } from 'class-validator';

export class ConfigDto {
  @IsString()
  SUPABASE_URL: string;

  @IsString()
  SUPABASE_KEY: string;

  @IsString()
  CASE_MALAYSIA_URL: string;

  @IsString()
  CASE_STATE_URL: string;
}
