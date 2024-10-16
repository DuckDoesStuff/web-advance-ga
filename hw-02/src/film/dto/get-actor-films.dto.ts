import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class GetActorFilms {
	@ApiProperty({
		description: "Actor first name",
		example: "PENELOPE"
	})
	@IsString()
  @IsNotEmpty({message: "firstName is required"})
	firstName: String;

	@ApiProperty({
		description: "Actor last name",
		example: "GUINESS"
	})
	@IsString()
  @IsNotEmpty({message: "firstName is required"})
	lastName: String;
}