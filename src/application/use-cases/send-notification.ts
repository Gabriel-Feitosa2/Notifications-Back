/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationRepository } from '../repositories/notification-repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  categort: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, categort } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      categort,
    });

    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
