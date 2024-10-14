import { Exclude } from "class-transformer";
import { Film } from "src/film/entities/film.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Language {
	@PrimaryGeneratedColumn({type: "tinyint"})
	@Exclude()
	languageId: Number;

	@Column({type: "char", length: 20})
	name: String;

	@Column({type: "timestamp"})
	@Exclude()
	lastUpdate: Date;

	@OneToMany((type) => Film, (film) => film.language)
	films: Film[]

	@OneToMany((type) => Film, (film) => film.originalLanguage)
	filmsOriginal: Film[]
}
