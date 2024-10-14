import { Rating } from "../entities/rating.enum";
import { SpecialFeatures } from "../entities/special_features.set";

export class CreateFilmDto {
	title: String;
	description?: String;
	releaseYear: Number;
	length: Number;
	language: String;
	originalLanguage: String;
	rating: Rating;
	specialFeatures: SpecialFeatures;
}
