/* eslint-disable prettier/prettier */
import { Notification } from '../entities/notification';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipientId(recipentId: string): Promise<number>;
  abstract findManyByRecipientId(recipentId: string): Promise<Notification[]>;
}