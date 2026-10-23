import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Manager } from "../../managers/entities/manager.entity.js";
import { Region } from "../../regions/entities/region.entity.js";
import { Employee } from "../../employees/entities/employee.entity.js";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @ApiProperty({
        default: "OCSO Juriquilla"
    })

    @Column('text')
    locationName: string;


    @ApiProperty({
        default: "Avenida , S/N 76220"
    })
    @Column('text')
    locationAddress: string;

    @ApiProperty({
        default: [12, 12]
    })
    @Column('simple-array')
    locationLatLng: number[];

    @ApiProperty({default: "f0f501d4-60c4-4760-a559-96fb5de9e0de"})
    @OneToOne(() => Manager, (manager) => manager.location, {
        eager: true,
    })
    @JoinColumn({
        name: "managerId"
    })
    manager: Manager | string;
    
    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: "regionId"
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];
    
}
