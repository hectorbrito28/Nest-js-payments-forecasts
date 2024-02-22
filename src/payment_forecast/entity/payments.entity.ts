import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,OneToMany} from "typeorm"
import {UserEntity} from "src/user/entity/user.entity"
import {PaymentData} from "src/payment-data/entity/payments_data.entity"

@Entity({name:"payments"})
export class PaymentEntity{

    @PrimaryGeneratedColumn("increment")
    id:number

    @Column({type:"varchar",unique:true})
    name:string

    @Column({type:"date"})
    deadline:string

    @ManyToOne(() => UserEntity, (user) => user.payments_forecasts,{nullable:false,onDelete:"CASCADE",onUpdate:"CASCADE",eager:true})
    user:UserEntity    

    @OneToMany(() => PaymentData,(paymenData) => paymenData.from_payment,{nullable:true,eager:true})
    paymentData:PaymentData[]

    constructor(payment:Partial<PaymentEntity>){
        Object.assign(this,payment)
    }
}