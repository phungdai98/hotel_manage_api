// mail.controller.ts
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class MailController {
  @EventPattern('booking_confirmed')
  async handleBookingConfirmed(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    console.log('\n========== GIẢ LẬP GỬI MAIL ==========');
    console.log(`Gửi tới : ${data.email}`);
    console.log(`Tiêu đề : Xác nhận đặt phòng #${data.bookingId}`);
    console.log(
      `Nội dung: Xin chào ${data.name}, đặt phòng #${data.bookingId} đã được xác nhận!`,
    );

    // Giả lập độ trễ gửi mail (2 giây) để thấy rõ tính bất đồng bộ
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Đã gửi xong (giả lập)');
    console.log('======================================\n');

    // Xác nhận đã xử lý xong → RabbitMQ xóa message khỏi queue
    channel.ack(originalMsg);
  }
}
