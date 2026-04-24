import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderTicket } from './orderTicket.entity';
import { Room } from './room.entity';
import { StatusRoomEnum } from '../common/enums/statusRoomEnum';

@Entity('detail_status')
export class DetailStatus {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'date_start', type: 'timestamp' })
  dateStart!: Date;

  @Column({ name: 'date_end', type: 'timestamp' })
  dateEnd!: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @Column({ name: 'room_id' })
  roomId!: string;

  @ManyToOne(() => Room, (room) => room.detailStatuses)
  @JoinColumn({ name: 'room_id' })
  room!: Room;

  @Column({ name: 'status', type: 'enum', enum: StatusRoomEnum })
  status!: StatusRoomEnum;

  @Column({ name: 'order_ticket_id', nullable: true })
  orderTicketId?: string;

  @ManyToOne(() => OrderTicket, (orderTicket) => orderTicket.detailStatuses)
  @JoinColumn({ name: 'order_ticket_id' })
  orderTicket?: OrderTicket;
}
