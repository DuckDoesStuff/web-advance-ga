import { IsOptional, IsString } from "class-validator";
import { GetCommon } from "../../common/get-common.dto";
import { ApiProperty } from "@nestjs/swagger";


export class GetActor extends GetCommon {
	@IsString()
	@IsOptional()
	@ApiProperty({
    description: 'Actor first name',
    type: String,
    example: 'John',
  })
	firstName?: String;
	
	@IsString()
	@IsOptional()
	@ApiProperty({
    description: 'Actor first name',
    type: String,
    example: 'John',
  })
	lastName?: String;
}