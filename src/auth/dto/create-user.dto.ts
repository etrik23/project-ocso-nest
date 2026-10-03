import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { User } from "../entities/user.entity.js";
import { OmitType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto extends OmitType(User, ['userId'] as const) {
    @ApiProperty({
        default: "user@gmail.com"
    })
    @IsEmail()
    declare userEmail: string;

    @ApiProperty({
        default: "23112008"
    })
    @IsString()
    @MinLength(8)
    declare userPassword: string;


    @ApiProperty({
        default: "Employee"
    })
    @IsOptional()
    @IsIn(["Admin", "Employee", "Manager"])
    userRoles: string[];

}
