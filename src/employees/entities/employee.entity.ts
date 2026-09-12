import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
}
