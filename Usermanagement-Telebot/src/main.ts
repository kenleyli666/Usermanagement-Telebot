import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(`Server is running at port 3001`);
  const app = await NestFactory.create(AppModule); // 创建 Nest 应用
  
  // 启用 CORS，允许来自指定源的请求
  app.enableCors({
    origin: 'http://localhost:3001', // 允许的前端地址
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的 HTTP 方法
    credentials: true, // 允许携带凭证
  });
  
  await app.listen(process.env.PORT ?? 3001); // 监听指定端口，默认为 3001
}

bootstrap();