import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('BOT Tips | Telegram - Discord')
    .setDescription(
      'is an API designed to manage and send programming language news tips to a specific Discord or Telegram channel. This API allows users to send programming tips, which are automatically sent to a Discord or Telegram channel according to the frequency specified at the time of user registration.,',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(3000);
  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST',
    allowedHeaders: 'Content-Type, Accept',
  });

  console.log('Project started => localhost:3000');
  console.log('=========================================================');
  console.log('Access to the project via Swagger: localhost:3000/api-doc');
}

bootstrap();
