import { HttpException, HttpStatus, Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from "typeorm"
import {UserEntity} from "src/user/entity/user.entity"
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import {UpdateResult,DeleteResult} from "typeorm"
import { genSalt, hash } from 'bcrypt';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private userEntity:Repository<UserEntity>
    ){}


    async createUser(createUserDto:CreateUserDto):Promise<UserEntity>{
        const userExist = await this.userEntity.findOne(
            {
                where:{
                    username:createUserDto.username
                }
            }
        )
        if (userExist){
            throw new  HttpException("User already exists",HttpStatus.CONFLICT)
        }else{
            
            try{
                const salts = await genSalt(10)
                const password_encripted = await hash(createUserDto.password,salts)
                const newUser = this.userEntity.create(
                    {
                        ...createUserDto,
                        password:password_encripted,
                        
                    }
                )
                return this.userEntity.save(newUser)

            }catch{
                throw new HttpException("Please insert a valid password",HttpStatus.BAD_REQUEST)
            }

            
          
        }

    }

    async getUsers():Promise<UserEntity[]>{
        return await this.userEntity.find(
            {
                select:["id","username","role"]
            }
        )

    }

    async getUserById(userId:number):Promise<UserEntity>{
        const userFound = await this.userEntity.findOne(
            {
                where:{
                    id:userId
                },
                select:["id","username","role"]
            }
        )
        return userFound

    }

    async updateUser(userId:number,updateUserDto:UpdateUserDto):Promise<UpdateResult>{
        const userFound = await this.userEntity.findOne(
            {
                where:{
                    id:userId
                }
            }
        )

        if (userFound){
            const usernameAlreadyExist = await this.userEntity.find(
                {
                    where:{
                        username:updateUserDto.username
                    }
                }
            )
            if (usernameAlreadyExist.length >= 1){
                throw new HttpException("Username Already exists",HttpStatus.CONFLICT)

            }
            const updatedUser = await this.userEntity.update(userId,updateUserDto)

            return updatedUser
        
        }

        throw new HttpException("User does not exist",HttpStatus.NOT_FOUND)
        
    }

    async deleteUser(userId:number):Promise<DeleteResult>{
        return  await this.userEntity.delete(userId)

    }


}
