import { Controller, ParseIntPipe,Param,Body, Post, Get, Delete, HttpException, HttpStatus, Patch } from '@nestjs/common';
import {UpdateResult,DeleteResult} from "typeorm"
import { PaymentDataService } from './payment-data.service';
import {PaymentData} from "src/payment-data/entity/payments_data.entity"
import { CreatePaymentDataDto } from './dto/payment_data.dto';

@Controller('payment-data')
export class PaymentDataController {
  constructor(private readonly paymentDataService: PaymentDataService) {
  }


  @Get()
  async getAllPaymentsData():Promise<PaymentData[]>{
    return this.paymentDataService.getAllPaymentsData()
  }

  @Patch("update/:paymentDataId")
  async updatePaymentData(
    @Param("paymentDataId",ParseIntPipe) paymentDataId:number,
    @Body() createPaymentDataDto:CreatePaymentDataDto
  ):Promise<UpdateResult>{
    const {business, amount, forecast_type} = createPaymentDataDto

    if (business || amount || forecast_type){
      return this.paymentDataService.updatePaymentData(paymentDataId,createPaymentDataDto)
    }else{
      throw new HttpException("We need at least one of these properties (business, amount, forecast_type)",HttpStatus.BAD_REQUEST)
    }
  }

  @Delete("delete/:paymentDataId")
  async deletePaymentData(
    @Param("paymentDataId",ParseIntPipe) paymentDataId:number,
  ):Promise<DeleteResult>{
    return this.paymentDataService.deletePaymentData(paymentDataId)
  }

  @Post("new/:paymentId")
  async createPaymentData(
    @Param("paymentId",ParseIntPipe) paymentId:number,
    @Body() createPaymentDataDto:CreatePaymentDataDto,
  ):Promise<PaymentData>{

    const {business,amount,forecast_type} = createPaymentDataDto

    if (business && amount && forecast_type){
      return this.paymentDataService.createPaymentData(paymentId,createPaymentDataDto)
    }else{
      throw new HttpException("We need... (business, amount, forecast_type properties)",HttpStatus.BAD_REQUEST)
    }
  }
}
