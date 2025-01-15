import { Controller, Post, Get, Body, Param, Redirect } from '@nestjs/common';
import { ShortenerService } from './shortener.service';

@Controller('shorten')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post()
  async create(@Body('url') url: string) {
    return await this.shortenerService.shortenUrl(url);
  }

  @Get(':shortUrl')
  @Redirect()
  async redirect(@Param('shortUrl') shortUrl: string) {
    const url = await this.shortenerService.getUrl(shortUrl);
    return { url: url, statusCode: 302 };
  }
}
