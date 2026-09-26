import { IsEmail, IsString, MinLength } from "class-validator";
import { User } from "../entities/user.entity.js";
import { OmitType } from "@nestjs/mapped-types";

export class CreateUserDto extends OmitType(User, ['userId'] as const) {
    @IsEmail()
    declare userEmail: string;
    @IsString()
    @MinLength(8)
    declare userPassword: string;

}
