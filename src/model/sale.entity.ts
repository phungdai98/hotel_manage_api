import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { DetailSale } from "./detailSale.entity";

@Entity('sale')
export class Sale {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({name: 'name'})
    name!: string;

    @Column({name: 'date_start', type: 'timestamp'})
    dateStart!: Date;

    @Column({name: 'date_end', type: 'timestamp'})
    dateEnd!: Date;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt!: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt!: Date;

    @OneToMany(() => DetailSale, (detailSale) => detailSale.sale)
    detailSales!: DetailSale[];
}