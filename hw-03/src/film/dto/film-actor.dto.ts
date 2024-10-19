import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class FilmActor {
	@ApiProperty({
		description: "Actor id",
		example: 1
	})
	@Type(() => Number)
  @IsNotEmpty({message: "actorId is required"})
	@IsInt()
	actorId: Number;

	@ApiProperty({
		description: "Film id",
		example: 1
	})
	@IsInt()
	@Type(() => Number)
  @IsNotEmpty({message: "filmId is required"})
	filmId: number;
}