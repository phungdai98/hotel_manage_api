import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Sale } from "./sale.entity";
import { RankRoom } from "./rankRoom.entity";

@Entity('detail_sale')
export class DetailSale {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({name: 'decription'})
    decription!: string;

    @Column({name: 'ratio'})
    ratio!: number;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt!: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt!: Date;

    @Column({ name: 'sale_id' })
    saleId!: string;

    @ManyToOne(() => Sale, (sale) => sale.detailSales)
    @JoinColumn({name: 'sale_id'})
    sale!: Sale;

    @Column({ name: 'rank_room_id' })
    rankRoomId!: string;

    @ManyToOne(() => RankRoom, (rankRoom) => rankRoom.detailSales)
    @JoinColumn({name: 'rank_room_id'})
    rankRoom!: RankRoom;
}