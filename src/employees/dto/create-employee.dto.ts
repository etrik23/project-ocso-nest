import { IsEmail, IsObject, IsOptional, IsString, isString, MaxLength, maxLength } from "class-validator";
import { Employee } from "../entities/employee.entity.js";
import { Location } from "../../locations/entities/location.entity.js";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class LocationEmployeeDto extends Location {
    @ApiProperty()
    declare locationId: number;
    @ApiPropertyOptional()
    declare locationName: string;

    @ApiPropertyOptional()
    declare locationLatLng: number[];

    @ApiPropertyOptional()
    declare locationAddress: string;
}



export class CreateEmployeeDto{
    @ApiProperty()
    @IsString()
    @MaxLength(30)
    employeeName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(70)
    employeeLastName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(10)
    employeePhoneNumber: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    employeeEmail: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    location: LocationEmployeeDto;
}
