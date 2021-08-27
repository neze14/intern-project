import { FunctionalArea } from "src/global/app.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({nullable: true})
    description: string;

    @Column({ type: 'enum', enum: FunctionalArea, nullable: true })
    functionalArea: FunctionalArea;
}