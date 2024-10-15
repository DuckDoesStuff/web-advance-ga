import { IsInt } from "class-validator";

export class FilmActor {
	@IsInt()
	actorId: Number;

	@IsInt()
	filmId: Number;
}