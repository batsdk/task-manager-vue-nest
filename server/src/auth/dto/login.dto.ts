import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Username for the user account' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'Password for the account' })
  @IsNotEmpty()
  @IsString()
  password: string;
}