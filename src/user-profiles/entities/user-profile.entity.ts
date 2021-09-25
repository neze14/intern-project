import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';

@Entity()
export class UserProfile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true})
    photo: string;

    @Column({ nullable: true })
    photoMimeTyper: string
    
    // **RELATIONSHIPS** //
    
    @Column({ nullable: true })
    userId: number;

    @OneToOne( () => User, user => user.userProfile)
    @JoinColumn({name: 'userId'})
    user: User;

}
