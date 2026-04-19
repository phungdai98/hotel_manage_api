import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DetailStatus } from './detailStatus.entity';
import { RankRoom } from './rankRoom.entity';
import { Rent } from './rent.entity';

@Entity('room')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'name' })
  name!: string;

  @Column({ name: 'floor' })
  floor!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @Column({ name: 'rank_room_id' })
  rankRoomId!: string;

  @ManyToOne(() => RankRoom, (rankRoom) => rankRoom.rooms)
  @JoinColumn({ name: 'rank_room_id' })
  rankRoom!: RankRoom;

  @OneToMany(() => DetailStatus, (detailStatus) => detailStatus.room)
  detailStatuses!: DetailStatus[];

  @OneToMany(() => Rent, (rent) => rent.room)
  rents!: Rent[];
}
