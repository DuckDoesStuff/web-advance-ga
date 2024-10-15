import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class GetActorFilms {
	@ApiProperty({
		description: "Actor first name",
		example: "PENELOPE"
	})
	@IsString()
	firstName: String;

	@ApiProperty({
		description: "Actor last name",
		example: "GUINESS"
	})
	@IsString()
	lastName: String;
}