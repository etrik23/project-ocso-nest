import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "../../locations/entities/location.entity.js";
@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employeeId: string;
    @Column('text')
    name: string;
    @Column('text')
    lastName: String;
    @Column('text')
    phoneNumber: String;
    @Column('text')
    email: string;
    @Column({
        type: 'text',
        nullable: true
    })
    photoURL: string;

    @ManyToOne(() => Location, (location) => location.employees)
    @JoinColumn({
        name: "locationId"
    })
    location: Location;
}
