import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class FilmActor {
	@ApiProperty({
		description: "Actor id",
		example: 1
	})
	@Type(() => Number)
	@IsInt()
	actorId: Number;

	@ApiProperty({
		description: "Film id",
		example: 1
	})
	@IsInt()
	@Type(() => Number)
	filmId: number;
}