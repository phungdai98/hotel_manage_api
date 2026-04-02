import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { DetailSale } from "./detailSale.entity";

@Entity('sale')
export class Sale {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'name'})
    name: string;

    @Column({name: 'date_start'})
    dateStart: string;

    @Column({name: 'date_end'})
    dateEnd: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => DetailSale, (detailSale) => detailSale.sale)
    detailSales: DetailSale[];
}