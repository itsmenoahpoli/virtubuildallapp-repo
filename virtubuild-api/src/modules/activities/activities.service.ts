import { labActivitiesRepository } from "@/database";

export class ActivitiesService {
	public async listByModule(moduleId: number) {
		return labActivitiesRepository.find({ where: { moduleId, isEnabled: true } });
	}

	public async getById(id: number) {
		return labActivitiesRepository.findOneBy({ id });
	}
}


