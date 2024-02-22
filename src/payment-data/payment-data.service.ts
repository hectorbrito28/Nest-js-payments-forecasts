import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {PaymentData} from "src/payment-data/entity/payments_data.entity"
import {PaymentEntity} from "src/payment_forecast/entity/payments.entity"
import {InjectRepository} from "@nestjs/typeorm"
import {Repository,UpdateResult,DeleteResult} from "typeorm"
import { CreatePaymentDataDto } from './dto/payment_data.dto';
@Injectable()
export class PaymentDataService {

    constructor(
        @InjectRepository(PaymentData) private paymentDataEntity:Repository<PaymentData>,
        @InjectRepository(PaymentEntity) private paymentEntity:Repository<PaymentEntity>,
    ){}

    async createPaymentData(paymentId:number,createPaymentDataDto:CreatePaymentDataDto):Promise<PaymentData>{
        const paymentFound = await this.paymentEntity.findOneBy(
            {
                id:paymentId
            }
        )

        if (paymentFound){

            const newPaymentData = this.paymentDataEntity.create(
                {
                    ...createPaymentDataDto,
                    from_payment:paymentFound
                }
            )

            return await this.paymentDataEntity.save(newPaymentData)
        }else{
            throw new HttpException("Payment does not exist, Id is false",HttpStatus.BAD_REQUEST)
        }

    }

    async updatePaymentData(
        paymentDataId:number,
        createPaymentDataDto:CreatePaymentDataDto
    ):Promise<UpdateResult>{

        const paymentDataFound = await this.paymentDataEntity.findOneBy(
            {
                id:paymentDataId
            }
        )

        if (paymentDataFound){
            const updatedPaymentData = await this.paymentDataEntity.update(paymentDataFound,createPaymentDataDto)
            return updatedPaymentData
        }else{
            throw new HttpException("Payment data Id does not exist, payment data was not found",HttpStatus.NOT_FOUND)
        }
    }

    async deletePaymentData(paymentDataId:number):Promise<DeleteResult>{
        return await this.paymentDataEntity.delete(paymentDataId)
    }

    async getAllPaymentsData():Promise<PaymentData[]>{
        return await this.paymentDataEntity.find(
            {
                relations:{
                    from_payment:false
                }
            }
        )
    }


}
