import { ApiProperty } from "@nestjs/swagger";

export class CreateUserProfileDto {
    @ApiProperty()
    readonly photo?: string;
    readonly photoMimeTyper?: string

    readonly userId?: number;

}
