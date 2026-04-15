import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, Unique } from "typeorm";
import { DetailOrderTicket } from "./detailOrderTicket.entity";
import { KindRoom } from "./kindRoom.entity";
import { TypeRoom } from "./typeRoom.entity";
import { Room } from "./room.entity";
import { DetailSale } from "./detailSale.entity";
import { DetailPriceRoom } from "./detailPriceRoom.entity";

@Entity('rank_room')
@Unique(['kindRoomId', 'typeRoomId'])
export class RankRoom {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({name: 'url_image'})
    urlImage!: string;

    @Column({name: 'limit_people'})
    limitPeople!: number;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt!: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt!: Date;

    @OneToMany(() => DetailOrderTicket, (detailOrderTicket) => detailOrderTicket.rankRoom)
    detailOrderTickets!: DetailOrderTicket[];

    @Column({ name: 'kind_room_id' })
    kindRoomId!: string;

    @ManyToOne(() => KindRoom, (kindRoom) => kindRoom.rankRooms)
    @JoinColumn({name: 'kind_room_id'})
    kindRoom!: KindRoom;

    @Column({ name: 'type_room_id' })
    typeRoomId!: string;

    @ManyToOne(() => TypeRoom, (typeRoom) => typeRoom.rankRooms)
    @JoinColumn({name: 'type_room_id'})
    typeRoom!: TypeRoom;

    @OneToMany(() => Room, (room) => room.rankRoom)
    rooms!: Room[];

    @OneToMany(() => DetailSale, (detailSale) => detailSale.rankRoom)
    detailSales!: DetailSale[];

    @OneToMany(() => DetailPriceRoom, (detailPriceRoom) => detailPriceRoom.rankRoom)
    detailPriceRooms!: DetailPriceRoom[];
}
