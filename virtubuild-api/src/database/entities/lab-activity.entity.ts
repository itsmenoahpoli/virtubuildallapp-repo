import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DateFieldsEntity } from "./shared.entity";

@Entity()
export class LabActivity extends DateFieldsEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	moduleId: number;

	@Column()
	title: string;

	@Column({ type: "text", nullable: true })
	description?: string;

	@Column({ type: "jsonb", nullable: true })
	componentsMetadata?: any;

	@Column({ type: "jsonb", nullable: true })
	gamification?: any;

	@Column({ type: "boolean", default: true })
	isEnabled: boolean;
}


