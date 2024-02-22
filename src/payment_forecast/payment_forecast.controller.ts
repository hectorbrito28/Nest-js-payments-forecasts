import { Body, Controller,Delete,Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PaymentForecastService } from './payment_forecast.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto';
import { PaymentEntity } from './entity/payments.entity';
import { PaymentData } from 'src/payment-data/entity/payments_data.entity';
import {DeleteResult} from "typeorm"

@Controller('payment-forecast')
export class PaymentForecastController {
  constructor(private readonly paymentForecastService: PaymentForecastService) {}


  @Get()
  async getPayments():Promise<PaymentEntity[]>{
    return this.paymentForecastService.getAllPayments()
  }

  @Get("ByBusiness/:businessName")
  async getPaymentsByBusiness(
    @Param("businessName") businessName:string
  ):Promise<PaymentData[]>{ 
    return this.paymentForecastService.getPaymentsByBusiness(businessName)

  }

  @Get("byUsername/:username")
  async getPaymentsByUsername(
    @Param("username") username:string
  ):Promise<PaymentEntity[]>{
    
    return this.paymentForecastService.getPaymentsByUsername(username)
  }

  @Post("new/:userId")
  async createPayment(
    @Param("userId",ParseIntPipe) userId:number ,
    @Body() createPaymentDto:CreatePaymentDto
  ):Promise<PaymentEntity>{

    const {name,deadline} = createPaymentDto

    if (name && deadline){
      return this.paymentForecastService.createPayment(userId,createPaymentDto)
    }else{
      throw new HttpException("Invalid Dto, we need: (name, deadline) properties",HttpStatus.BAD_REQUEST)
    }
    
  }

  @Patch(":paymentId")
  async updatePayment(
    @Param("paymentId",ParseIntPipe) paymentId:number,
    @Body() updatePaymentDto:UpdatePaymentDto,
  ):Promise<PaymentEntity>{
    
    const {name, deadline} = updatePaymentDto

    if (name || deadline){
      return this.paymentForecastService.updatePayment(paymentId,updatePaymentDto)
    }else{
      throw new HttpException("Invalid Dto, we need...(name or deadline properties for update)",HttpStatus.BAD_REQUEST)
    }

  }

  @Delete("delete/:paymentId")
  async deletePayment(
    @Param("paymentId",ParseIntPipe) paymentId:number
  ):Promise<DeleteResult>{
    return this.paymentForecastService.deletePayment(paymentId)
  }

}
