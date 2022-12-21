/* eslint-disable prettier/prettier */
import { Notification } from '@application/entities/notification';

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      categort: notification.categort,
      recipientId: notification.recipientId,
    };
  }
}