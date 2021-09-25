import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';

@Entity()
export class Department {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true})
    description: string;

    @Column()
    location: string;

    @OneToMany( () => User, user => user.department)
    users: User[]
}