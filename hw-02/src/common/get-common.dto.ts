import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class GetCommon {
  @ApiPropertyOptional({
    description: "Specify result set size",
    example: 5,
    default: 5,
    minimum: 1
  })
	@IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number;

  @ApiPropertyOptional({
    description: "Specify the offset",
    default: 0,
    example: 0
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;
}