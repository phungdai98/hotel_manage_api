import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Service } from "./service.entity";

@Entity('detail_price_service')
export class DetailPriceService {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'price'})
    price: number;

    @Column({name: 'active_date', type: 'timestamp'})
    activeDate: string;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt: string;

    @Column({ name: 'service_id' })
    serviceId: string;

    @ManyToOne(() => Service, (service) => service.detailPriceServices)
    @JoinColumn({name: 'service_id'})
    service: Service;
}