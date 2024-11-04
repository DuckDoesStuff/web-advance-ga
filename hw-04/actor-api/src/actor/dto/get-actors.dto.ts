import { IsInt, IsOptional, IsString, Min } from "class-validator";


export class GetActor {
	@IsString()
	@IsOptional()
	firstName?: String;
	
	@IsString()
	@IsOptional()
	lastName?: String;

	@IsOptional()
	@IsInt()
	@Min(1)
  limit: number;

	@IsOptional()
	@IsInt()
	@Min(0)
  offset?: number;
}