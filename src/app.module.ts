import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PaymentForecastModule } from './payment_forecast/payment_forecast.module';

import {TypeOrmModule} from "@nestjs/typeorm";
import { PaymentDataModule } from './payment-data/payment-data.module';


@Module({
  imports: [UserModule, PaymentDataModule,PaymentForecastModule,
  TypeOrmModule.forRoot({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"localpas",
    database:"nest-api-database",
    entities:[__dirname + "/**/*entity{.ts,.js}"],
    synchronize:true,
    autoLoadEntities:true
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
