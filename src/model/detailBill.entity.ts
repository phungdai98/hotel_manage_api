import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('detail_bill')
export class DetailBill {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'bill_id' })
  billId!: string;

  @Column({ name: 'room_id' })
  roomId!: string;

  @Column({ name: 'price_room' })
  priceRoom!: number;

  @Column({ name: 'price_service' })
  priceService!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;
}
