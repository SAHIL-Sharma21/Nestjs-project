import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

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

    //creating all the routes
    @Get() //GET all the users OR /Users?role=admin&page=1 -> query param
    findAll(@Query('role') role?:"Admin" | "User", @Query('page') page?: number){
        return {
            user: [],
            role,
            page
        }
    }

    @Get(':id') //GET one user
    findOne(@Param('id') id:string){
        return {id}
    }

    @Post() //Post one user
    create(@Body() user:{}){
        return user
    }

    @Patch(':id') //update one user
    update(@Param('id') id: string, @Body() userUpdate:{}){
        return {id, ...userUpdate}
    }

    @Delete(':id') //delete one user
    deleteUser(@Param('id') id:string){
        return {id, user: []}
    }

}
