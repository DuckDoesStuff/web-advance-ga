import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { GetCommon } from '../../common/get-common.dto';

export class GetFilmsDto extends GetCommon {
  @IsOptional()
  @IsString()
  lang?: string;

  @IsOptional()
  @IsString()
  cate?: string;

  @IsOptional()
  @IsString()
  title?: string;
}
