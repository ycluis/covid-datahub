import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from 'src/utils/config/config.service';

@Injectable()
export class SupabaseService {
  private readonly client: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    this.client = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
    );
  }

  async insert(table: string, records: any[]) {
    const { data, error } = await this.client.from(table).insert(records);
    if (error) {
      throw new Error(`Supabase insert error: ${error.message}`);
    }

    return data;
  }
}
