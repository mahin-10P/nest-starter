import { ApiProperty } from '@nestjs/swagger';

export interface JWTPayload {
    userId: string;
}

export class LoginDTO {
    @ApiProperty()
    email: string;
    @ApiProperty()
    pass: string;
}

export class UserDTO {
    @ApiProperty()
    email: string;
    @ApiProperty()
    pass: string;
}