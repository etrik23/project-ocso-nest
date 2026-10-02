import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "../../employees/entities/employee.entity.js";
import { Manager } from "../../managers/entities/manager.entity.js";
import type { Relation } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    userId: string;
    @Column('text', {
        unique: true,
    })
    userEmail: string;
    @Column('text')
    userPassword: string;
    @Column('simple-array', {
        default: "Employee"
    })
    userRoles: string[];

    @OneToOne(() => Manager, {
        eager: true
    })
    manager: Relation<Manager>;

    @OneToOne(() => Employee, {
        eager: true
    })
    employee: Relation<Employee>;
}