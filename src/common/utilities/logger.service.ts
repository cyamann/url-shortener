import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
  logMessage(message: string) {
    this.log(message);
  }
}
