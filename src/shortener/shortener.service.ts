import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class ShortenerService {
  private redis = new Redis();

  async shortenUrl(url: string): Promise<{ shortUrl: string }> {
    const shortUrl = Math.random().toString(36).substring(2, 8);
    await this.redis.set(shortUrl, url, 'EX', 86400);
    return { shortUrl: `http://localhost:3000/${shortUrl}` };
  }

  async getUrl(shortUrl: string): Promise<{ originalUrl: string | null }> {
    const originalUrl = await this.redis.get(shortUrl);
    return { originalUrl };
  }
}
