import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DateFieldsEntity } from "./shared.entity";

@Entity()
export class Assessment extends DateFieldsEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	moduleId: number;

	@Column({ type: "jsonb" })
	quiz: any;

	@Column({ type: "boolean", default: true })
	isEnabled: boolean;
}


