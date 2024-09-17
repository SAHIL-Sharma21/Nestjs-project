import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import {UsersService} from './users.service'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')//decorators - route will be domain/users
export class UsersController {
    // we will write the routes here
    /* 
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */

    constructor(private readonly usersService: UsersService){}

    //creating all the routes
    @Get() //GET all the users OR /Users?role=admin&page=1 -> query param
    findAll(@Query('role') role?:"Admin" | "User", @Query('page') page?: number){
        return this.usersService.findAll(role, page)
    }

    //pipe is the middleware for validation
    @Get(':id') //GET one user
    findOne(@Param('id', ParseIntPipe) id:number){
        return this.usersService.findOne(id)//converting this id to number by + or we can also do by parseInt
    }

    @Post() //Post one user
    create(@Body(ValidationPipe) createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto);
    }

    @Patch(':id') //update one user
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto:UpdateUserDto){
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id') //delete one user
    deleteUser(@Param('id', ParseIntPipe) id:number){
        return this,this.usersService.delete(id);
    }

}
