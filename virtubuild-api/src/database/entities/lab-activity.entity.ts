import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { DateFieldsEntity } from "./shared.entity";
import { Module } from "./module.entity";
import { Assessment } from "./assessment.entity";

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


	@Column({ type: "boolean", default: true })
	isEnabled: boolean;

	@ManyToOne(() => Module)
	@JoinColumn({ name: 'moduleId' })
	module?: Module;

	@OneToMany(() => Assessment, assessment => assessment.labActivity)
	assessments?: Assessment[];
}


