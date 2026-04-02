import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Service } from "./service.entity";
import { Rent } from "./rent.entity";

@Entity('detail_service')
export class DetailService {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'decription'})
    decription: string;

    @Column({name: 'amount'})
    amount: number;

    @Column({name: 'price'})
    price: number;

    @Column({name: 'is_payed'})
    isPayed: boolean;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @Column({ name: 'service_id' })
    serviceId: string;

    @ManyToOne(() => Service, (service) => service.detailServices)
    @JoinColumn({name: 'service_id'})
    service: Service;

    @Column({ name: 'rent_id' })
    rentId: string;

    @ManyToOne(() => Rent, (rent) => rent.detailServices)
    @JoinColumn({name: 'rent_id'})
    rent: Rent;
}