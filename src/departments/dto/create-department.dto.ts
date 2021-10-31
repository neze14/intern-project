import { ApiProperty } from "@nestjs/swagger";

export class CreateDepartmentDto {
    
    @ApiProperty()
    readonly name: string;
    readonly description?: string;
    readonly location: string;
    
}
