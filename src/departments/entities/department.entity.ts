import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Department {

    @PrimaryGeneratedColumn()
    id: number;
}