import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class CsvParserService {
  async parseFromUrl(url: string): Promise<any[]> {
    const records: any[] = [];

    const response = await axios.get(url, {
      responseType: 'stream',
    });

    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch CSV file from ${url}. Status: ${response.status}`,
      );
    }

    return new Promise((resolve, reject) => {
      const stream = response.data as Readable;

      stream
        .pipe(csvParser())
        .on('data', (data) => records.push(data))
        .on('end', () => resolve(records))
        .on('error', (err) =>
          reject(err instanceof Error ? err : new Error(String(err))),
        );
    });
  }
}
