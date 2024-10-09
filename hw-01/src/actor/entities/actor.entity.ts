import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Actor {
	@PrimaryGeneratedColumn()
	actor_id: number;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

	@Column()
	last_update: Date;

	@BeforeInsert()
	@BeforeUpdate()
	changeLastUpdate() {
		this.last_update = new Date();
	}
}
