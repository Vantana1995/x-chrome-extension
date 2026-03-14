import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: false,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin: (origin, callback) => {
      const allowed = [
        process.env.FRONTEND_URL,
        /^chrome-extension:\/\/.+/,
      ].filter(Boolean) as (string | RegExp)[];

      const isAllowed =
        !origin ||
        allowed.some((p) =>
          typeof p === 'string' ? p === origin : p.test(origin),
        );

      callback(null, isAllowed);
    },
    credentials: true,
  });

  const port = process.env.PORT ? Number(process.env.PORT) : 3001;
  await app.listen(port);
}
bootstrap();
