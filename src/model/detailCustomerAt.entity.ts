import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { Rent } from "./rent.entity";

@Entity('detail_customer_at')
export class DetailCustomerAt {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'decription'})
    decription: string;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt: string;

    @Column({ name: 'customer_id' })
    customerId: string;

    @ManyToOne(() => Customer, (customer) => customer.detailCustomerAts)
    @JoinColumn({name: 'customer_id'})
    customer: Customer;

    @Column({ name: 'rent_id' })
    rentId: string;

    @ManyToOne(() => Rent, (rent) => rent.detailCustomerAts)
    @JoinColumn({name: 'rent_id'})
    rent: Rent;
}
