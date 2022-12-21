/* eslint-disable prettier/prettier */
import { makeNotification } from '@test/factories/notification-factory';
import { InMemorynotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get.recipient-notification';

describe('Get recipients notification', () => {
  it('should be able to Get recipient notifcations', async () => {
    const notificationRepository = new InMemorynotificationRepository();
    const countRecipientNotifications = new GetRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipent-1' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'recipent-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipent-2' }),
    );

    const { notifications } = await countRecipientNotifications.execute({
      recipentId: 'recipent-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipent-1' }),
        expect.objectContaining({ recipientId: 'recipent-1' }),
      ]),
    );
  });
});
