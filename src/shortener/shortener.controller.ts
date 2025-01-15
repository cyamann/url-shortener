import { Controller, Post, Get, Body, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { Response } from 'express';

@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post('shorten')
  async create(@Body('url') url: string) {
    return await this.shortenerService.shortenUrl(url);
  }

  @Get(':shortUrl')
  async redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const result = await this.shortenerService.getUrl(shortUrl);
    if (result.originalUrl) {
      console.log(`Redirecting to: ${result.originalUrl}`);
      res.redirect(result.originalUrl);
    } else {
      throw new HttpException('URL not found', HttpStatus.NOT_FOUND);
    }
  }
  

}
