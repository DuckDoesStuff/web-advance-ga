import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "./auth.entity";

@Entity()
export class Token {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false
	})
	token: string;

	@Column({
		default: true
	})
	valid: Boolean;

	@ManyToOne(type => Auth, auth => auth.refreshTokens)
	auth: Auth
}