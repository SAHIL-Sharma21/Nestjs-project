import { Injectable } from '@nestjs/common';

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
            return this.users.filter(user => user.role === role )
        } 
        return this.users;
    }

    findOne(id: number){
        // const userId = String(id);
        return this.users.find(user => user.id === id);
    }

    create(user: {username:string, email: string, role?: "Admin"|"User"|"Intern"}){
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            role: user.role || "User",
            ...user
        }

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updatedUser: {username?:string, email?: string, role?: "Admin"|"User"|"Intern"}){
        this.users = this.users.map(user => {
            if(user.id === id) {
                return {...user, ...updatedUser}
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
