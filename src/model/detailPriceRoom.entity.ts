import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { RankRoom } from "./rankRoom.entity";

@Entity('detail_price_room')
export class DetailPriceRoom {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'price'})
    price: number;

    @Column({name: 'active_date', type: 'timestamp'})
    activeDate: Date;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

    @Column({ name: 'rank_room_id' })
    rankRoomId: string;

    @ManyToOne(() => RankRoom, (rankRoom) => rankRoom.detailPriceRooms)
    @JoinColumn({name: 'rank_room_id'})
    rankRoom: RankRoom;
}