import { ArrayNotEmpty, IsArray, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "../entities/location.entity.js";
import { Region } from "../../regions/entities/region.entity.js";

export class CreateLocationDto {
    @IsString()
    @MaxLength(35)
    locationName: string;
    @IsString()
    @MaxLength(160)
    locationAddress: string;
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];
    @IsObject()
    @IsOptional()
    region: Region;
}
