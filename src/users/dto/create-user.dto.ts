import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsEnum(["Admin","User","Intern"], {
        message: "Valid role required"
    })
    role: "Admin"|"User"|"Intern";
}