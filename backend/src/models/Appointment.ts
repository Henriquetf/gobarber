import { uuid } from 'uuidv4';

export type AppointmentCreateData = Omit<Appointment, 'id'>;

class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor({ date, provider }: AppointmentCreateData) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
