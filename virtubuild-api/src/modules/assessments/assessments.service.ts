import { assessmentsRepository } from "@/database";

export class AssessmentsService {
	public async getByModule(moduleId: number) {
		return assessmentsRepository.findOneBy({ moduleId });
	}

	public async upsert(moduleId: number, quiz: any) {
		const existing = await this.getByModule(moduleId);
		if (existing) {
			await assessmentsRepository.update(existing.id, { quiz });
			return assessmentsRepository.findOneBy({ id: existing.id });
		}
		const created = assessmentsRepository.create({ moduleId, quiz, isEnabled: true });
		return assessmentsRepository.save(created);
	}
}


