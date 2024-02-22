import { Module, forwardRef } from '@nestjs/common';
import { PaymentDataService } from './payment-data.service';
import { PaymentDataController } from './payment-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {PaymentData} from "src/payment-data/entity/payments_data.entity"
import {PaymentForecastModule} from "src/payment_forecast/payment_forecast.module"


@Module({
  imports:[TypeOrmModule.forFeature([PaymentData]),forwardRef(() => PaymentForecastModule)],
  exports:[TypeOrmModule],
  controllers: [PaymentDataController],
  providers: [PaymentDataService],
})
export class PaymentDataModule {}
