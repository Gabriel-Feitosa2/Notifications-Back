import { Body, Controller, Get, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { CancelNotification } from '@application/use-cases/cancel.notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { Patch } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { ReadNotification } from '@application/use-cases/read-notifications';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get.recipient-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotifcation: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async counFromRecipient(
    @Param('recipientId') recipentId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipentId,
    });

    return {
      count,
    };
  }

  @Get('list/from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipentId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipentId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotifcation.execute({
      notificationId: id,
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, categort } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      categort,
    });

    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
