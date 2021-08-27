import { Gender } from "src/global/app.enum";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column({ nullable: true })
    middleName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    homeAddress: string;

    @Column({ type: 'enum', enum: Gender, nullable: true })// nullable cus of people in this generation...vIBES
    gender: Gender;

    @Column({ nullable: true }) //nullable because of Social Auth possibility of not getting it
    dateOfBirth: Date;

    @Column({ nullable: true })
    nationality: string;

    @Column({ nullable: true })
    state: string;

    @Column({ nullable: true })
    city: string

    @Column({ nullable: true })
    county: string

    @Column({ nullable: true })
    zip: string;

    @Column({ nullable: true })
    photo: string; //photo file location. Use stream to send

    @Column({ nullable: true })
    photoMimeType: string; //save the encoding of uploaded file for content-type use for reply.type as shown above

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isSoftDeleted: boolean;

    @Column({ unique: true })
    @Index()
    primaryEmailAddress: string;

    @Column({ nullable: true })
    backupEmailAddress: string;

    @Column("simple-json", { nullable: true })
    phone: { mobile: string[], office: string[], home: string[] }

    @Column({ default: false })
    isPrimaryEmailAddressVerified: boolean;

    @Column({ default: false })
    isBackupEmailAddressVerified: boolean;


    @Column({ select: false }) //don't select password whenever user is called. See https://typeorm.io/#/select-query-builder/hidden-columns
    passwordHash: string;

    //set to true if password change is required
    @Column({ default: false })
    isPasswordChangeRequired: boolean;

    //token to be generated when password change request is made
    @Column({ unique: true, nullable: true, select: false })
    resetPasswordToken: string;

    @Column({ nullable: true })
    resetPasswordExpiration: Date;

    @Column({ nullable: true, select: false })
    primaryEmailVerificationToken: string;

    @Column({ nullable: true, select: false })
    backupEmailVerificationToken: string;

    @Column({ nullable: true })
    emailVerificationTokenExpiration: Date;

    //Incorporating OTP. See https://github.com/speakeasyjs/speakeasy
    @Column({ default: false })
    otpEnabled: boolean

    @Column({ nullable: true, select: false })
    otpSecret: string;

    // /* for refresh token save after successful login*/
    // @Column({ select: false, nullable: true })
    // public refreshTokenHash: string;
}