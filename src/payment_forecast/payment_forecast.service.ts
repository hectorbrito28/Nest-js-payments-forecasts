import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"
import {PaymentEntity} from "src/payment_forecast/entity/payments.entity"
import {PaymentData} from "src/payment-data/entity/payments_data.entity"
import {Repository} from "typeorm"
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto';
import {UserEntity} from "src/user/entity/user.entity"
import {DataSource,DeleteResult} from "typeorm"


@Injectable()
export class PaymentForecastService {

    constructor(
        @InjectRepository(PaymentEntity) private paymentEntity:Repository<PaymentEntity>,
        @InjectRepository(PaymentData) private paymentDataEntity:Repository<PaymentData>,
        @InjectRepository(UserEntity) private userEntity:Repository<UserEntity>,
        private dataSource:DataSource
        
    ){}


    async createPayment(
        userId:number,
        createPaymentDto:CreatePaymentDto,
    ):Promise<PaymentEntity>{

        const namePaymentAlreadyExists = await this.paymentEntity.findOneBy(
            {
                name:createPaymentDto.name
            }
        )
        
        if (namePaymentAlreadyExists){
            throw new HttpException("Payment name already exists",HttpStatus.CONFLICT)
        }

        const userFound = await this.userEntity.findOneBy(
            {
                id:userId
            }
        )

        if (userFound && createPaymentDto.paymentData?.length >= 1){

            

            const newPayment = this.paymentEntity.create(
                {
                    ...createPaymentDto,
                    user:userFound,
                    paymentData:[]

                }
            )
            const newPaymentSaved= await this.paymentEntity.manager.save(newPayment)

            const paymentsData = createPaymentDto.paymentData.map((CreatePaymentDataDto) => new PaymentData(CreatePaymentDataDto) )

            paymentsData.map((paymentdata) => paymentdata.from_payment = newPayment)

            try{
                await this.paymentDataEntity.manager.save(paymentsData)
            

                return newPaymentSaved

            }catch{
                throw new HttpException("Payment created, please,check your paymentData Dto, we need...(business, amount, forecast_type properties)",HttpStatus.BAD_REQUEST)
            }

        }

        if (userFound){

            const newPayment = this.paymentEntity.create(
                {
                    ...createPaymentDto,
                    user:userFound,
                    paymentData:[]
                }
            )

            return this.paymentEntity.manager.save(newPayment)

        }
        else{
            throw new HttpException("User does not exists",HttpStatus.NOT_FOUND)
        }
    }
    
    async updatePayment(
        paymentId:number,
        updatePaymentDto:UpdatePaymentDto
    ):Promise<PaymentEntity>{
        if (updatePaymentDto.name){
            const paymentNameAlreadyExists = await this.paymentEntity.findOneBy(
                {
                    name:updatePaymentDto.name
                }
            )
    
            if (paymentNameAlreadyExists){
                throw new HttpException("Payment name already exists",HttpStatus.BAD_REQUEST)
            }
        }

        const paymentFound = await this.paymentEntity.findOneBy(
            {
                id:paymentId
            }
        )
        
        if (paymentFound){
            
            paymentFound.name = updatePaymentDto.name ?  updatePaymentDto.name  : paymentFound.name

            paymentFound.deadline = updatePaymentDto.deadline ? updatePaymentDto.deadline : paymentFound.deadline

            const updatedPayment = await this.paymentEntity.manager.save(paymentFound)

            return updatedPayment
        }else{
            throw new HttpException("Payment does not exists",HttpStatus.NOT_FOUND)
        }
    }

    
    async deletePayment(paymentId:number):Promise<DeleteResult>{
        return this.paymentEntity.delete(paymentId)
        
    }
    
    async getAllPayments():Promise<PaymentEntity[]>{
        return await this.paymentEntity.createQueryBuilder("payment").leftJoinAndSelect("payment.user","user").select(["payment.id","payment.name","payment.deadline","user"]).getMany()

        // this.paymentEntity.find(
        //     {
                
        //         relations:{
        //             user:false,
        //             paymentData:false
        //         }
        //     }
        // )
    }

    async getPaymentsByBusiness(businessName:string):Promise<PaymentData[]>{

        const paymenDataFound = await this.paymentDataEntity.findOneBy({business:businessName})

        if (paymenDataFound){

            const paymentsFound = await this.paymentDataEntity.createQueryBuilder("paymentdata").leftJoinAndSelect("paymentdata.from_payment","from_payment").select(["paymentdata.business","paymentdata.amount","from_payment"]).where("paymentdata.business = :business",{business:businessName}).getMany()
            return paymentsFound
        }else{
            throw new HttpException("PaymentData business name does not exist",HttpStatus.NOT_FOUND)
        }
       
    }

    async getPaymentsByUsername(username:string):Promise<PaymentEntity[]>{

        const userFound:UserEntity = await this.userEntity.findOneBy(
            {
                username:username
            }
        )

        if (userFound){
            
            const query = await this.dataSource.getRepository(PaymentEntity).createQueryBuilder("payment").where("payment.user = :userId ",{userId:userFound.id}).getMany()
            
            return query
        }else{
            throw new HttpException("User does not exist",HttpStatus.NOT_FOUND)
        }
     
    }
}
