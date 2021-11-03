import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as winston from 'winston'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'ugum-saas' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //

    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log'}),
  ],
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //await app.init()

  /** Setup SWAGGER for API documentation */
  const options= new DocumentBuilder()
    .setTitle("Internship Application")
    .setDescription("Application developed as teaching aid for Internship")
    .setVersion("v1")
    .build();
  
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document); // the swagger URL is thus /api

  await app.listen(3000);

  logger.info(`Application is running on: ${await app.getUrl()}`)
}

bootstrap();