import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { DetailOrderTicket } from "./detailOrderTicket.entity";
import { DetailStatus } from "./detailStatus.entity";
import { RentTicket } from "./rentTicket.entity";
import { User } from "./user.entity";

@Entity('order_ticket')
export class OrderTicket {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'date_start'})
    dateStart: string;

    @Column({name: 'date_end'})
    dateEnd: string;

    @Column({name: 'status'})
    status: string;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

    @OneToMany(() => DetailOrderTicket, (detailOrderTicket) => detailOrderTicket.orderTicket)
    detailOrderTickets: DetailOrderTicket[];

    @Column({ name: 'customer_id' })
    customerId: string;

    @ManyToOne(() => Customer, (customer) => customer.orderTickets)
    @JoinColumn({name: 'customer_id'})
    customer: Customer;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User, (user) => user.orderTickets)
    @JoinColumn({name: 'user_id'})
    user: User;

    @OneToMany(() => DetailStatus, (detailStatus) => detailStatus.orderTicket)
    detailStatuses: DetailStatus[];

    @OneToOne(() => RentTicket, (rentTicket) => rentTicket.orderTicket)
    rentTicket: RentTicket;
}