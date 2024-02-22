import { IsEnum, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator"
import { ForecastTypeEnum } from "src/payment-data/enum/payment_type.enum"

export class CreatePaymentDataDto{

    @IsString()
    @IsNotEmpty()
    business:string


    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    amount:number

    @IsEnum(ForecastTypeEnum)
    forecast_type:ForecastTypeEnum

    
}