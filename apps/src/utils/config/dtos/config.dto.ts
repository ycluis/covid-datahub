import { IsString } from 'class-validator';

export class ConfigDto {
  @IsString()
  SUPABASE_URL: string;

  @IsString()
  SUPABASE_KEY: string;
}
