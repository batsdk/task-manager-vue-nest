import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateTaskDto {

  @ApiProperty({ description: 'Title of the Task' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({ description: 'Description of the Task' })
  @IsOptional()
  @IsString()
  description?: string;

}
