import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { RankRoom } from "./rankRoom.entity";

@Entity('type_room')
export class TypeRoom {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'name'})
    name: string;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt: string;

    @OneToMany(() => RankRoom, (rankRoom) => rankRoom.typeRoom)
    rankRooms: RankRoom[];
}