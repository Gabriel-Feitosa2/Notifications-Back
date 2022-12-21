/* eslint-disable prettier/prettier */
import { Notification as RowNotification } from '@prisma/client';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      categort: notification.categort,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createAt: notification.createAt,
    };
  }

  static toDomain(raw: RowNotification): Notification {
    return new Notification(
      {
        categort: raw.categort,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        canceldAt: raw.canceldAt,
        createAt: raw.createAt,
      },
      raw.id,
    );
  }
}
