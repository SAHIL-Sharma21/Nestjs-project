import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id":1,
            "username":"Sahil",
            "email":"sahil@dev.com",
            "role":"Admin"
        },
        {
            "id":2,
            "username":"yamato",
            "email":"yamao@jp.com",
            "role":"Intern"
        },
        {
            "id":3,
            "username":"Chopper",
            "email":"chopper@au.com",
            "role":"User"
        },
        {
            "id":4,
            "username":"Luffy",
            "email":"luffy@jp.com",
            "role":"Admin"
        },
        {
            "id":5,
            "username":"Nami",
            "email":"nami@gmail.com",
            "role":"User"
        }
    ];


    findAll(role?: "Admin"| "User" | "Intern", page?:number){
        if(role){
            const roles =  this.users.filter(user => user.role === role )

            if (role.length === 0){
                throw new NotFoundException("user role not found")
            }

            return roles;

        } 
        return this.users;
    }

    findOne(id: number){
        // const userId = String(id);
        const user = this.users.find(user => user.id === id);

        if (!user){
            throw new NotFoundException("User not found")
        }
        return user;
    }

    create(createUserDto: CreateUserDto){
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            role: createUserDto.role || "User",
            ...createUserDto
        }

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto){
        this.users = this.users.map(user => {
            if(user.id === id) {
                return {...user, ...updateUserDto}
            }
            return user
        })

        return this.findOne(id);
    }

    delete(id: number){
        const removedUser = this.findOne(id);

        this.users = this.users.filter(user => user.id !== id);

        return removedUser;
    }
}
