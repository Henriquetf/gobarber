import { ObjectId } from 'mongodb';

import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import Notification from '../../infrastructure/typeorm/schemas/Notification';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  async create({ content, recipientId }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign<Notification, Notification>(notification, {
      id: new ObjectId() as never,
      content,
      recipientId,
      read: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
