import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserProfile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true})
    photo: string;

}
