import { IsString } from "class-validator";


export class GetActorFilms {
	@IsString()
	firstName: String;
	@IsString()
	lastName: String;
}