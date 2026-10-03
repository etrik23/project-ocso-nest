import { IsEmail, IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity.js";
import { Location } from "../../locations/entities/location.entity.js";

export class CreateManagerDto extends Manager {
    @IsString()
    @MaxLength(80)
    declare managerFullName: string;
    @IsString()
    @IsEmail()
    declare managerEmail: string;
    @IsNumber()
    declare managerSalary: number;
    @IsString()
    @MaxLength(16)
    declare managerPhoneNumber: string;
    @IsObject()
    @IsOptional()   
    declare location: Location;
}
