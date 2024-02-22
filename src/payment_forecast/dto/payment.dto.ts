import {IsDateString, IsNotEmpty,IsString, ValidateNested} from "class-validator"
import { CreatePaymentDataDto } from "../../payment-data/dto/payment_data.dto"
import { OmitType, PartialType } from "@nestjs/mapped-types"
import { Type } from "class-transformer"

export class CreatePaymentDto{

    @IsString()
    @IsNotEmpty()
    name:string

    @IsDateString()
    @IsNotEmpty()
    deadline:string

    @ValidateNested()
    @Type(() => CreatePaymentDataDto)
    paymentData:CreatePaymentDataDto[]

    

}


export class UpdatePaymentDto extends PartialType(OmitType(CreatePaymentDto,["paymentData"])){}