import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infrastructure/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
