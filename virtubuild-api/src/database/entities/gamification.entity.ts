import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { DateFieldsEntity } from "./shared.entity";
import { User } from "./user.entity";

@Entity()
export class Gamification extends DateFieldsEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	studentId: number;

	@Column({ type: "int", default: 0 })
	totalPoints: number;

	@Column({ type: "int", default: 0 })
	level: number;

	@Column({ type: "jsonb", nullable: true })
	badges?: any;

	@Column({ type: "jsonb", nullable: true })
	achievements?: any;

	@Column({ type: "int", default: 0 })
	streak: number;

	@Column({ type: "int", default: 0 })
	activitiesCompleted: number;

	@ManyToOne(() => User)
	@JoinColumn({ name: "studentId" })
	student: User;
}
