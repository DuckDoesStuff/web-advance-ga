import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../../film/entities/film.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Actor {
	@PrimaryGeneratedColumn({type: "tinyint"})
	@Exclude()
	actorId: Number;

	@Column("varchar", {length: 45})
	firstName: String;

	@Column("varchar", {length: 45})
	lastName: String;

	@Column("timestamp")
	@Exclude()
	lastUpdate: Date;

	@ManyToMany((type) => Film, (film) => film.actors)
	films: Film[]
}
