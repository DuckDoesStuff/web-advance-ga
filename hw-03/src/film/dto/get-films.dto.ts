import { IsOptional, IsString } from 'class-validator';
import { GetCommon } from '../../common/get-common.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetFilmsDto extends GetCommon {
  @ApiPropertyOptional({
    description: "Film language",
    example: "English"
  })
  @IsOptional()
  @IsString()
  lang?: string;

  @ApiPropertyOptional({
    description: "Film category",
    example: "Documentary"
  })
  @IsOptional()
  @IsString()
  cate?: string;

  @ApiPropertyOptional({
    description: "Film title",
    example: "DINO"
  })
  @IsOptional()
  @IsString()
  title?: string;
}
