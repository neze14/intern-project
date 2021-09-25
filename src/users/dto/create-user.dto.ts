import { ApiProperty } from "@nestjs/swagger";
import { CountryList, Gender } from "src/global/app.enum";
import { CreateUserProfileDto } from '../../user-profiles/dto/create-user-profile.dto';

export class CreateUserDto {

    /**
     * This is the first name of the user, Shoukd not be more than 20 characters
     * @example Chineze
     */
    readonly firstName: string;
    readonly middleName?: string;
    readonly lastName: string;
    readonly commonName?: string;
    readonly homeAddress?: string;
    readonly gender?: Gender;
    readonly dateOfBirth?: Date;
    readonly nationality?: CountryList; 
    readonly state?: string;
    readonly city?: string
    readonly county?: string
    readonly zip?: string;
    readonly photo?: string; //photo file location. Use stream to send
    readonly photoMimeType?: string; //save the encoding of uploaded file for content-type use for reply.type as shown above
    readonly isActive?: boolean;
    readonly isSoftDeleted?: boolean;
    readonly primaryEmailAddress: string;
    readonly backupEmailAddress?: string;
    readonly phone?: { mobile: string[], office: string[], home: string[] }
    readonly isPrimaryEmailAddressVerified: boolean;
    readonly isBackupEmailAddressVerified?: boolean;
    passwordHash: string;
    readonly isPasswordChangeRequired?: boolean;
    readonly resetPasswordToken?: string;
    readonly resetPasswordExpiration?: Date;
    readonly primaryEmailVerificationToken?: string;
    readonly backupEmailVerificationToken?: string;
    readonly emailVerificationTokenExpiration?: Date;
    readonly otpEnabled?: boolean
    readonly otpSecret?: string;

    // **RELATIONSHIPS** //
    readonly userProfile?: CreateUserProfileDto;
    readonly departmentId?: number;

}
