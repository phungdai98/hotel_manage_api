import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { DetailOrderTicket } from './detailOrderTicket.entity';
import { DetailStatus } from './detailStatus.entity';
import { RentTicket } from './rentTicket.entity';
import { User } from './user.entity';

@Entity('order_ticket')
export class OrderTicket {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'date_start', type: 'timestamp' })
  dateStart!: Date;

  @Column({ name: 'date_end', type: 'timestamp' })
  dateEnd!: Date;

  @Column({ name: 'status' })
  status!: string;

  @Column({ name: 'deposit', type: 'int', nullable: true, default: 0 })
  deposit!: number | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(
    () => DetailOrderTicket,
    (detailOrderTicket) => detailOrderTicket.orderTicket,
  )
  detailOrderTickets!: DetailOrderTicket[];

  @Column({ name: 'customer_id' })
  customerId!: string;

  @ManyToOne(() => Customer, (customer) => customer.orderTickets)
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;

  @Column({ name: 'user_id', nullable: true })
  userId?: string | null;

  @ManyToOne(() => User, (user) => user.orderTickets, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User | null;

  @OneToMany(() => DetailStatus, (detailStatus) => detailStatus.orderTicket)
  detailStatuses!: DetailStatus[];

  @OneToOne(() => RentTicket, (rentTicket) => rentTicket.orderTicket)
  rentTicket!: RentTicket;
}
