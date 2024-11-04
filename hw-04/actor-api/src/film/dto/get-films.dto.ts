import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetFilmsDto {
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
	@IsInt()
	@Min(1)
  limit: number;

	@IsOptional()
	@IsInt()
	@Min(0)
  offset?: number;
}
