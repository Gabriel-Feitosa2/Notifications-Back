/* eslint-disable prettier/prettier */
import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    categort: 'social',
    content: new Content('Nova solicitação de amizade!'),
    recipientId: 'recipent-2',
    ...override,
  });
}
