// main.mail.ts  (file khởi động riêng cho mail service)
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MailModule } from './mail.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@127.0.0.1:5672'],
        queue: 'mail_queue',
        wildcards: true,
        queueOptions: { durable: true },

        noAck: false,
      },
    },
  );
  await app.listen();
  console.log('[Mail] Microservice đang lắng nghe...');
}
bootstrap();
