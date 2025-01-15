import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { redis } from './common/redis.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

async function testRedisConnection() {
  try {
    await redis.set("test_key", "Hello, Redis!");
    const value = await redis.get("test_key");
    console.log('Redis Test:', value); 
  } catch (error) {
    console.error('Redis Connection Failed:', error);
  }
}

testRedisConnection();
