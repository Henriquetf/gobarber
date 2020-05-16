import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type AppointmentCreateData = Omit<Appointment, 'id'>;

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  provider!: string;

  @Column('timestamp with time zone')
  date!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

export default Appointment;
