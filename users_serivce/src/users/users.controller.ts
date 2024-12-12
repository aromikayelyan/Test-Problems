import { Body, Controller, Post, Get, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){

    }

    @Post('')
    create(@Body() userDto: CreateUserDto){
        return this.userService.createUser(userDto)
    }

    @Get()
    getAll(){
        return this.userService.getAllUsers()
    }

    @Put('/problems')
    problemSolving(){
        return this.userService.solveproblems()
    }


}
