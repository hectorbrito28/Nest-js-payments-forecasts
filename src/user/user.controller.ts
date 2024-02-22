import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  HttpException, 
  HttpStatus, 
  Param, 
  ParseIntPipe, 
  Patch, 
  Post, } from '@nestjs/common';
import {UpdateResult,DeleteResult} from "typeorm"
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/users")
  getUsers():Promise<UserEntity[]>{
    return this.userService.getUsers()
  }

  @Get("/byId/:userId")
  getUserById(@Param("userId",ParseIntPipe) userId:number):Promise<UserEntity>{
    return this.userService.getUserById(userId)
  }


  @Post("/new")
  createNewUser(
    @Body() createUserDto:CreateUserDto
  ):Promise<UserEntity>{
      const {username,password} = createUserDto

      if (username && password){
        return this.userService.createUser(createUserDto)

      }else{
        throw new HttpException("Invalid Dto, we need...(username and password properties)",HttpStatus.BAD_REQUEST)
      }

      
  }

  @Patch("update/:userId")
  updateUser(
    @Param("userId",ParseIntPipe) userId:number,
    @Body() updateUserDto:UpdateUserDto):Promise<UpdateResult>{
    return this.userService.updateUser(userId,updateUserDto)

  }

  @Delete("delete/:userId")
  deleteUser(@Param("userId",ParseIntPipe) userId:number):Promise<DeleteResult>{
    return this.userService.deleteUser(userId)
  }


}

