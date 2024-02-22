import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,OneToMany,JoinColumn} from "typeorm"
import { Role } from "../enum/user_role.enum"

import {PaymentEntity} from "src/payment_forecast/entity/payments.entity"

@Entity({name:"users"})
export class UserEntity{


    @PrimaryGeneratedColumn("increment")
    id:number

    @Column({type:"varchar",unique:true,nullable:false,length:255})
    username:string

    @Column({type:"varchar",length:255,nullable:false})
    password:string

    @Column({type:"enum",enum:Role,default:Role.basic})
    role:Role

    @Column({type:"date"})
    @CreateDateColumn()
    created:Date

    @OneToMany(() => PaymentEntity,(payment) => payment.user)
    @JoinColumn()
    payments_forecasts:PaymentEntity[]

    constructor(user:Partial<UserEntity>){
        Object.assign(this,user)
    }
}