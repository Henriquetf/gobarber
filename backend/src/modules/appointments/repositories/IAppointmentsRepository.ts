import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import Appointment from '../infrastructure/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | null>;
  findAll(): Promise<Appointment[]>;
}
