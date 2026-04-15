import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DetailCustomerAt } from "./detailCustomerAt.entity";
import { OrderTicket } from "./orderTicket.entity";
import { RentTicket } from "./rentTicket.entity";

@Entity('customer')
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({name: 'id_card'})
    idCard!: string;

    @Column()
    name!: string;

    @Column()
    gender!: boolean;

    @Column()
    phone!: string;

    @Column()
    address!: string;

    @Column({name: 'date_of_birth', type: 'timestamp'})
    dateOfBirth!: Date;

    @Column()
    point!: number;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt!: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt!: Date;

    @OneToMany(() => OrderTicket, (orderTicket) => orderTicket.customer)
    orderTickets!: OrderTicket[];

    @OneToMany(() => RentTicket, (rentTicket) => rentTicket.customer)
    rentTickets!: RentTicket[];

    @OneToMany(() => DetailCustomerAt, (detailCustomerAt) => detailCustomerAt.customer)
    detailCustomerAts!: DetailCustomerAt[];
}