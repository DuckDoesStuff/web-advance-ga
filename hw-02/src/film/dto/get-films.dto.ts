import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { GetCommon } from '../../common/get-common.dto';

export class GetFilmsDto extends GetCommon {
  @IsOptional()
  @Type(() => String)
  @IsString()
  lang?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  cate?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  title?: string;
}
