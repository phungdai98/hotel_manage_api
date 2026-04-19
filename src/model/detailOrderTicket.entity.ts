import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderTicket } from './orderTicket.entity';
import { RankRoom } from './rankRoom.entity';

@Entity('detail_order_ticket')
export class DetailOrderTicket {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'quantity' })
  quantity!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @Column({ name: 'order_ticket_id' })
  orderTicketId!: string;

  @ManyToOne(() => OrderTicket, (orderTicket) => orderTicket.detailOrderTickets)
  @JoinColumn({ name: 'order_ticket_id' })
  orderTicket!: OrderTicket;

  @Column({ name: 'rank_room_id' })
  rankRoomId!: string;

  @ManyToOne(() => RankRoom, (rankRoom) => rankRoom.detailOrderTickets)
  @JoinColumn({ name: 'rank_room_id' })
  rankRoom!: RankRoom;
}
