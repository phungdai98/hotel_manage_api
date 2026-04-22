import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrderTicket } from './orderTicket.entity';
import { User } from './user.entity';
import { Customer } from './customer.entity';
import { Rent } from './rent.entity';
import { Bill } from './bill.entity';

@Entity('rent_ticket')
export class RentTicket {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'date_start', type: 'timestamp' })
  dateStart!: Date;

  @Column({ name: 'date_end', type: 'timestamp', nullable: true })
  dateEnd!: Date;

  @Column({ name: 'is_payed' })
  isPayed!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @Column({ name: 'order_ticket_id' })
  orderTicketId!: string;

  @OneToOne(() => OrderTicket, (orderTicket) => orderTicket.rentTicket)
  @JoinColumn({ name: 'order_ticket_id' })
  orderTicket!: OrderTicket;

  @ManyToOne(() => User, (user) => user.rentTickets)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'customer_id' })
  customerId!: string;

  @ManyToOne(() => Customer, (customer) => customer.rentTickets)
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;

  @OneToMany(() => Rent, (rent) => rent.rentTicket)
  rents!: Rent[];

  @OneToMany(() => Bill, (bill) => bill.rentTicket)
  bills!: Bill[];
}
