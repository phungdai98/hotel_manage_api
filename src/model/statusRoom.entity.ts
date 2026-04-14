import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { DetailStatus } from "./detailStatus.entity";

@Entity('status_room')
export class StatusRoom {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'name'})
    name: string;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

    @OneToMany(() => DetailStatus, (detailStatus) => detailStatus.statusRoom)
    detailStatuses: DetailStatus[];
}