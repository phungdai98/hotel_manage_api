import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { RankRoom } from "./rankRoom.entity";

@Entity('kind_room')
export class KindRoom {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'name'})
    name: string;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt: string;

    @OneToMany(() => RankRoom, (rankRoom) => rankRoom.kindRoom)
    rankRooms: RankRoom[];
}