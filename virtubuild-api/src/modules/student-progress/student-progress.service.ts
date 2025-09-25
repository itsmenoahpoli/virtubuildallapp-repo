import { studentProgressRepository, labActivitiesRepository, studentGroupAssignmentsRepository, moduleActivationsRepository } from "@/database";
import { In } from "typeorm";

export class StudentProgressService {
	public async createProgress(progressData: any) {
		const progress = studentProgressRepository.create(progressData);
		return studentProgressRepository.save(progress);
	}

	public async getStudentProgress(studentId: number) {
		return studentProgressRepository.find({
			where: { studentId },
			relations: ["activity", "activity.module"],
			order: { createdAt: "DESC" }
		});
	}

	public async getProgressByActivity(activityId: number) {
		return studentProgressRepository.find({
			where: { activityId },
			relations: ["student"],
			order: { createdAt: "DESC" }
		});
	}

	public async getStudentProgressForActivity(studentId: number, activityId: number) {
		return studentProgressRepository.findOne({
			where: { studentId, activityId },
			relations: ["activity"]
		});
	}

	public async updateProgress(id: number, updateData: any) {
		await studentProgressRepository.update(id, updateData);
		return studentProgressRepository.findOne({
			where: { id },
			relations: ["student", "activity"]
		});
	}

	public async submitProgress(studentId: number, activityId: number, progressData: any) {
		const existing = await this.getStudentProgressForActivity(studentId, activityId);
		
		if (existing) {
			return this.updateProgress(existing.id, progressData);
		}

		return this.createProgress({
			studentId,
			activityId,
			...progressData
		});
	}

	public async getAssignedActivities(studentId: number) {
		const studentGroups = await studentGroupAssignmentsRepository.find({
			where: { studentId },
			relations: ["studentGroup"]
		});

		const groupNames = studentGroups.map(sg => sg.studentGroup.name);
		
		const activations = await moduleActivationsRepository.find({
			where: { groupName: In(groupNames), isActive: true }
		});

		const moduleIds = activations.map(a => a.moduleId);
		
		return labActivitiesRepository.find({
			where: { moduleId: In(moduleIds), isEnabled: true },
			relations: ["module"]
		});
	}

	public async getAssignedModules(studentId: number) {
		const studentGroups = await studentGroupAssignmentsRepository.find({
			where: { studentId },
			relations: ["studentGroup"]
		});

		const groupNames = studentGroups.map(sg => sg.studentGroup.name);
		
		const activations = await moduleActivationsRepository.find({
			where: { groupName: In(groupNames), isActive: true }
		});

		const moduleIds = activations.map(a => a.moduleId);
		
		return labActivitiesRepository.find({
			where: { moduleId: In(moduleIds), isEnabled: true },
			relations: ["module"]
		});
	}

	public async getInstructorStudentProgress() {
		return studentProgressRepository.find({
			relations: ["student", "activity", "activity.module"],
			order: { createdAt: "DESC" }
		});
	}

	public async getStudentCompletionStats(studentId: number) {
		const progress = await this.getStudentProgress(studentId);
		const total = progress.length;
		const completed = progress.filter(p => p.isCompleted).length;
		
		return {
			total,
			completed,
			completionRate: total > 0 ? (completed / total) * 100 : 0,
			averageScore: total > 0 ? progress.reduce((sum, p) => sum + p.score, 0) / total : 0
		};
	}
}
