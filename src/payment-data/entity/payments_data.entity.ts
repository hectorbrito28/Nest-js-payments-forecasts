import {Entity,Column,PrimaryGeneratedColumn,ManyToOne} from "typeorm"

import {ForecastTypeEnum} from "src/payment-data/enum/payment_type.enum"

import {PaymentEntity} from "src/payment_forecast/entity/payments.entity"

@Entity({name:"paymentData"})
export class PaymentData{

    @PrimaryGeneratedColumn("increment")
    id:number

    @Column({type:"varchar",nullable:false})
    business:string

    @Column({type:"int",nullable:false})
    amount:number

    @Column({type:"enum",enum:ForecastTypeEnum})
    forecast_type:ForecastTypeEnum

    @ManyToOne(() => PaymentEntity,(paymenEntity) => paymenEntity.paymentData,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    from_payment:PaymentEntity

    constructor(paymentData:Partial<PaymentData>){
        Object.assign(this,paymentData)
    }
}