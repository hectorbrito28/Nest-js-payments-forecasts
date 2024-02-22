import { Module, forwardRef } from '@nestjs/common';
import { PaymentForecastService } from './payment_forecast.service';
import { PaymentForecastController } from './payment_forecast.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {PaymentEntity} from "src/payment_forecast/entity/payments.entity"
import {PaymentDataModule} from "src/payment-data/payment-data.module"
import {UserModule} from "src/user/user.module"



@Module({
  imports:[UserModule,TypeOrmModule.forFeature([PaymentEntity]),forwardRef(() => PaymentDataModule,)],
  exports:[TypeOrmModule],
  controllers: [PaymentForecastController],
  providers: [PaymentForecastService],
})
export class PaymentForecastModule {}
