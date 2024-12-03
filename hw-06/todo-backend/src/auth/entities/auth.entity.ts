import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Token } from "./token.entity";

@Entity()
export class Auth {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	username: string

	@Column()
	password: string

	@OneToMany(type => Token, token => token.auth)
	refreshTokens: Token
}