import { IsString } from "class-validator";

export class CreateActorDto {
	@IsString()
	firstName:String;
	
	@IsString()
	lastName:String;
}
