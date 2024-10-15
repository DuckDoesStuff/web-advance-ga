import { IsEnum, IsInt, IsNumber, IsString } from "class-validator";
import { Rating } from "../entities/rating.enum";
import { SpecialFeatures } from "../entities/special_features.set";

export class CreateFilmDto {
	@IsString()
	title: String;

	@IsString()
	description?: String;

	@IsInt()
	releaseYear: Number;

	@IsNumber()
	length: Number;

	@IsString()
	language: String;

	@IsString()
	originalLanguage: String;

	@IsEnum(Rating)
	rating: Rating;

	@IsEnum(SpecialFeatures)
	specialFeatures: SpecialFeatures;
}
