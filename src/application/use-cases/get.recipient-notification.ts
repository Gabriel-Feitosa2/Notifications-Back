/* eslint-disable prettier/prettier */
import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';

interface GetRecipientNotificationsRequest {
  recipentId: string;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: GetRecipientNotificationsRequest,
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipentId } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipentId);

    return { notifications };
  }
}
