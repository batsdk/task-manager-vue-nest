import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationQueryDto {
  @ApiProperty({ description: 'Page number', default: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number;

  @ApiProperty({ description: 'Number of items per page', default: 10, required: false })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit?: number;
}