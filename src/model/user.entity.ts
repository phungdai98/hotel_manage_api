import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, Unique } from "typeorm";
import { OrderTicket } from "./orderTicket.entity";
import { Part } from "./part.entity";
import { RentTicket } from "./rentTicket.entity";
import { Bill } from "./bill.entity";

@Entity('user')
@Unique(['idCard', 'email', 'phone'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'id_card', unique: true})
    idCard: string;

    @Column({name: 'name'})
    name: string;

    @Column({name: 'email', unique: true})
    email: string;

    @Column({name: 'phone', unique: true})
    phone: string;

    @Column({name: 'address'})
    address: string;

    @Column({name: 'password'})
    password: string;

    @Column({name: 'role'})
    role: string;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

    @OneToMany(() => OrderTicket, (orderTicket) => orderTicket.user)
    orderTickets: OrderTicket[];

    @Column({ name: 'part_id' })
    partId: string;

    @ManyToOne(() => Part, (part) => part.users)
    @JoinColumn({name: 'part_id'})
    part: Part;

    @OneToMany(() => RentTicket, (rentTicket) => rentTicket.user)
    rentTickets: RentTicket[];

    @OneToMany(() => Bill, (bill) => bill.user)
    bills: Bill[];
}