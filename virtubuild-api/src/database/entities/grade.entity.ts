import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DateFieldsEntity } from "./shared.entity";

@Entity()
export class Grade extends DateFieldsEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: number;

	@Column()
	activityId: number;

	@Column({ type: "float" })
	score: number;

	@Column({ type: "jsonb", nullable: true })
	breakdown?: any;
}


