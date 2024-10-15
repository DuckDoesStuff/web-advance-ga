import { IsOptional, IsString } from "class-validator";
import { GetCommon } from "../../common/get-common.dto";


export class GetActor extends GetCommon {
	@IsString()
	@IsOptional()
	firstName?: String;
	
	@IsString()
	@IsOptional()
	lastName?: String;
}