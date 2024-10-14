import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../../film/entities/film.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Category {
	@PrimaryGeneratedColumn({type: "tinyint"})
	@Exclude()
	categoryId: Number;

	@Column({type: "varchar", length: 25})
	name: String;

	@Column({type: "timestamp"})
	@Exclude()
	lastUpdate: Date

	@ManyToMany((type) => Film, (film) => film.categories)
	films: Film[]
}
