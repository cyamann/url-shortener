import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ShortenerService {
  private redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
  });

  private baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  async shortenUrl(url: string): Promise<{ shortUrl: string }> {
    const existingKeys = await this.redis.keys('*');
    for (const key of existingKeys) {
      const value = await this.redis.get(key);
      if (value === url) {
        return { shortUrl: `${this.baseUrl}/${key}` }; 
      }
    }
  
    const shortUrl = Math.random().toString(36).substring(2, 8);
    await this.redis.set(shortUrl, url, 'EX', 86400); 
    return { shortUrl: `${this.baseUrl}/${shortUrl}` };
  }
  

  async getUrl(shortUrl: string): Promise<{ originalUrl: string | null }> {
    const originalUrl = await this.redis.get(shortUrl);
    console.log(`Fetched URL for key ${shortUrl}: ${originalUrl}`);
    return { originalUrl };
  }
  
}
