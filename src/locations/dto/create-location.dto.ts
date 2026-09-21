import { ArrayNotEmpty, IsArray, IsString, MaxLength } from "class-validator";
import { Location } from "../entities/location.entity.js";

export class CreateLocationDto extends Location {
    @IsString()
    @MaxLength(35)
    declare locationName: string;
    @IsString()
    @MaxLength(160)
    declare locationAdress: string;
    @IsArray()
    @ArrayNotEmpty()
    declare locationLatLng: number[];
}
