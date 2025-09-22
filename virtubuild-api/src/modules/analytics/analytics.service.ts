import { performanceAnalyticsRepository } from "@/database";

export class AnalyticsService {
	public async getForUser(userId: number) {
		return performanceAnalyticsRepository.find({ where: { userId } });
	}
}


