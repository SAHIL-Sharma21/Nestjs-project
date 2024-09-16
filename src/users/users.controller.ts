import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {UsersService} from './users.service'

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

    @Get(':id') //GET one user
    findOne(@Param('id') id:string){
        return this.usersService.findOne(+id)//converting this id to number by + or we can also do by parseInt
    }

    @Post() //Post one user
    create(@Body() user:{username:string, email: string, role?: "Admin"|"User"|"Intern"}){
        return this.usersService.create(user);
    }

    @Patch(':id') //update one user
    update(@Param('id') id: string, @Body() userUpdate:{username?:string, email?: string, role?: "Admin"|"User"|"Intern"}){
        return this.usersService.update(+id, userUpdate)
    }

    @Delete(':id') //delete one user
    deleteUser(@Param('id') id:string){
        return this,this.usersService.delete(+id);
    }

}
