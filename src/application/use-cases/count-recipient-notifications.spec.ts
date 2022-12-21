/* eslint-disable prettier/prettier */
import { makeNotification } from '@test/factories/notification-factory';
import { InMemorynotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipients notification', () => {
  it('should be able to count recipient notifcations', async () => {
    const notificationRepository = new InMemorynotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
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

    const { count } = await countRecipientNotifications.execute({
      recipentId: 'recipent-1',
    });

    expect(count).toEqual(2);
  });
});
