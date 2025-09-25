import { gamificationRepository, usersRepository } from "@/database";

export class GamificationService {
	public async getUserGamification(userId: number) {
		let gamification = await gamificationRepository.findOne({
			where: { studentId: userId }
		});

		if (!gamification) {
			gamification = await gamificationRepository.save({
				studentId: userId,
				totalPoints: 0,
				level: 1,
				badges: [],
				achievements: [],
				streak: 0,
				activitiesCompleted: 0
			});
		}

		return gamification;
	}

	public async updateUserPoints(userId: number, points: number) {
		const gamification = await this.getUserGamification(userId);
		const newTotalPoints = gamification.totalPoints + points;
		const newLevel = Math.floor(newTotalPoints / 100) + 1;

		await gamificationRepository.update(gamification.id, {
			totalPoints: newTotalPoints,
			level: newLevel
		});

		return this.getUserGamification(userId);
	}

	public async awardBadge(userId: number, badgeName: string, badgeData: any) {
		const gamification = await this.getUserGamification(userId);
		const badges = gamification.badges || [];
		
		const existingBadge = badges.find((badge: any) => badge.name === badgeName);
		if (existingBadge) {
			return gamification;
		}

		const newBadge = {
			name: badgeName,
			earnedAt: new Date(),
			...badgeData
		};

		badges.push(newBadge);

		await gamificationRepository.update(gamification.id, {
			badges
		});

		return this.getUserGamification(userId);
	}

	public async updateStreak(userId: number, increment: boolean = true) {
		const gamification = await this.getUserGamification(userId);
		const newStreak = increment ? gamification.streak + 1 : 0;

		await gamificationRepository.update(gamification.id, {
			streak: newStreak
		});

		return this.getUserGamification(userId);
	}

	public async incrementActivitiesCompleted(userId: number) {
		const gamification = await this.getUserGamification(userId);
		const newCount = gamification.activitiesCompleted + 1;

		await gamificationRepository.update(gamification.id, {
			activitiesCompleted: newCount
		});

		return this.getUserGamification(userId);
	}

	public async getLeaderboard() {
		const gamifications = await gamificationRepository.find({
			relations: ["student"],
			order: { totalPoints: "DESC" }
		});

		return gamifications.map(g => ({
			studentId: g.studentId,
			studentName: `${g.student.firstName} ${g.student.lastName}`,
			totalPoints: g.totalPoints,
			level: g.level,
			badges: g.badges?.length || 0,
			activitiesCompleted: g.activitiesCompleted,
			streak: g.streak
		}));
	}

	public async getTopPerformers(limit: number = 10) {
		const leaderboard = await this.getLeaderboard();
		return leaderboard.slice(0, limit);
	}

	public async getUserRank(userId: number) {
		const leaderboard = await this.getLeaderboard();
		const userIndex = leaderboard.findIndex(u => u.studentId === userId);
		return userIndex >= 0 ? userIndex + 1 : null;
	}

	public async checkAchievements(userId: number) {
		const gamification = await this.getUserGamification(userId);
		const achievements = gamification.achievements || [];
		const newAchievements = [];

		if (gamification.totalPoints >= 1000 && !achievements.find((a: any) => a.name === "Point Master")) {
			newAchievements.push({
				name: "Point Master",
				description: "Earned 1000 points",
				earnedAt: new Date()
			});
		}

		if (gamification.activitiesCompleted >= 10 && !achievements.find((a: any) => a.name === "Dedicated Learner")) {
			newAchievements.push({
				name: "Dedicated Learner",
				description: "Completed 10 activities",
				earnedAt: new Date()
			});
		}

		if (gamification.streak >= 7 && !achievements.find((a: any) => a.name === "Consistent Performer")) {
			newAchievements.push({
				name: "Consistent Performer",
				description: "7-day streak",
				earnedAt: new Date()
			});
		}

		if (newAchievements.length > 0) {
			const updatedAchievements = [...achievements, ...newAchievements];
			await gamificationRepository.update(gamification.id, {
				achievements: updatedAchievements
			});
		}

		return newAchievements;
	}
}
