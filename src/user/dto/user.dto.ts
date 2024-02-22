import { IsEnum, IsNotEmpty, IsString,IsStrongPassword} from "class-validator"
import { Role } from "../enum/user_role.enum"
import { OmitType, PartialType} from "@nestjs/mapped-types"


export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    username: string

    @IsStrongPassword({minLength:5,minNumbers:2})
    @IsNotEmpty()
    password: string

    @IsEnum(Role)
    role: Role
}


export class UpdateUserDto extends PartialType(OmitType(CreateUserDto,["password"])) {
}

