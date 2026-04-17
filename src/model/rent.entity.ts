import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { RentTicket } from "./rentTicket.entity";
import { Room } from "./room.entity";
import { Bill } from "./bill.entity";
import { DetailCustomerAt } from "./detailCustomerAt.entity";
import { DetailService } from "./detailService.entity";
import { Optional } from "@nestjs/common";

@Entity('rent')
export class Rent {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({name: 'surcharge'})
    surcharge!: number;

    @Column({name: 'reason', type: 'jsonb', default: {}})
    reason!: Record<string, string>;

    @Column({name: 'is_payed'})
    isPayed!: boolean;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt!: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt!: Date;

    @Column({ name: 'rent_ticket_id' })
    rentTicketId!: string;

    @ManyToOne(() => RentTicket, (rentTicket) => rentTicket.rents)
    @JoinColumn({name: 'rent_ticket_id'})
    rentTicket!: RentTicket;

    @Column({ name: 'room_id' })
    roomId!: string;

    @ManyToOne(() => Room, (room) => room.rents)
    @JoinColumn({name: 'room_id'})
    room!: Room;

    @Column({ name: 'bill_id', nullable: true })
    @Optional()
    billId?: string | null;

    @ManyToOne(() => Bill, (bill) => bill.rents, { nullable: true })
    @JoinColumn({name: 'bill_id'})
    bill?: Bill | null;

    @OneToMany(() => DetailCustomerAt, (detailCustomerAt) => detailCustomerAt.rent)
    detailCustomerAts!: DetailCustomerAt[];

    @OneToMany(() => DetailService, (detailService) => detailService.rent)
    detailServices!: DetailService[];
}