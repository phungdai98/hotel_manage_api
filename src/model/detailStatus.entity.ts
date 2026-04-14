import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderTicket } from "./orderTicket.entity";
import { Room } from "./room.entity";
import { StatusRoom } from "./statusRoom.entity";

@Entity('detail_status')
export class DetailStatus {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'date_start', type: 'timestamp' })
    dateStart: string;

    @Column({ name: 'date_end', type: 'timestamp' })
    dateEnd: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: string;

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
