import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Rent } from "./rent.entity";
import { User } from "./user.entity";
import { RentTicket } from "./rentTicket.entity";

@Entity('bill')
export class Bill {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'decription'})
    decription: string;
    
    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt: string;

    @OneToMany(() => Rent, (rent) => rent.bill)
    rents: Rent[];

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User, (user) => user.bills)
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column({ name: 'rent_ticket_id' })
    rentTicketId: string;

    @ManyToOne(() => RentTicket, (rentTicket) => rentTicket.bills)
    @JoinColumn({name: 'rent_ticket_id'})
    rentTicket: RentTicket;
}