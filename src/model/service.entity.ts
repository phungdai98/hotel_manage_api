import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { DetailService } from "./detailService.entity";
import { DetailPriceService } from "./detailPriceService.entity";

@Entity('service')
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({name: 'name'})
    name!: string;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt!: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt!: Date;

    @OneToMany(() => DetailService, (detailService) => detailService.service)
    detailServices!: DetailService[];

    @OneToMany(() => DetailPriceService, (detailPriceService) => detailPriceService.service)
    detailPriceServices!: DetailPriceService[];
}