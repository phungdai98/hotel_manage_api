import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Room } from "./room.entity";
import { StatusRoom } from "./statusRoom.entity";
import { OrderTicket } from "./orderTicket.entity";

@Entity('detail_status')
export class DetailStatus {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'date_start'})
    dateStart: string;

    @Column({name: 'date_end'})
    dateEnd: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @Column({ name: 'room_id' })
    roomId: string;

    @ManyToOne(() => Room, (room) => room.detailStatuses)
    @JoinColumn({name: 'room_id'})
    room: Room;

    @Column({ name: 'status_room_id' })
    statusRoomId: string;

    @ManyToOne(() => StatusRoom, (statusRoom) => statusRoom.detailStatuses)
    @JoinColumn({name: 'status_room_id'})
    statusRoom: StatusRoom;

    @Column({ name: 'order_ticket_id' })
    orderTicketId: string;

    @ManyToOne(() => OrderTicket, (orderTicket) => orderTicket.detailStatuses)
    @JoinColumn({name: 'order_ticket_id'})
    orderTicket: OrderTicket;
}
