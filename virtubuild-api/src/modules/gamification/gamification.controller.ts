import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { GamificationService } from "./gamification.service";
import { HttpStatusCode } from "@/types";
import { SendHttpResponse } from "@/utils";

export class GamificationController extends BaseController {
	public gamificationService: GamificationService;

	constructor() {
		super();
		this.gamificationService = new GamificationService();
		this.bindClassMethods(this);
	}

	/**
	 * @swagger
	 * /gamification/me:
	 *   get:
	 *     summary: Get my gamification data
	 *     description: Retrieve the current user's points, badges, achievements, and level
	 *     tags: [Gamification]
	 *     security:
	 *       - BearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Gamification data retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Gamification'
	 *       500:
	 *         description: Internal server error
	 */
	public async getMyGamification(req: Request, res: Response) {
		try {
			const userId = (req as any).user?.user?.id as number;
			const result = await this.gamificationService.getUserGamification(userId);
			this.sendHttpResponse(res, result);
		} catch (error) {
			console.error("Error getting gamification data:", error);
			this.sendHttpResponse(res, { error: "Failed to get gamification data" }, HttpStatusCode.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * @swagger
	 * /gamification/leaderboard:
	 *   get:
	 *     summary: Get gamification leaderboard
	 *     description: Retrieve the global leaderboard showing top performers
	 *     tags: [Gamification]
	 *     security:
	 *       - BearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Leaderboard retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 type: object
	 *                 properties:
	 *                   studentId:
	 *                     type: number
	 *                   studentName:
	 *                     type: string
	 *                   totalPoints:
	 *                     type: number
	 *                   level:
	 *                     type: number
	 *                   badges:
	 *                     type: number
	 *                   activitiesCompleted:
	 *                     type: number
	 *                   streak:
	 *                     type: number
	 *       500:
	 *         description: Internal server error
	 */
	public async getLeaderboard(req: Request, res: Response) {
		try {
			const result = await this.gamificationService.getLeaderboard();
			this.sendHttpResponse(res, result);
		} catch (error) {
			console.error("Error getting leaderboard:", error);
			this.sendHttpResponse(res, { error: "Failed to get leaderboard" }, HttpStatusCode.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * @swagger
	 * /gamification/top-performers:
	 *   get:
	 *     summary: Get top performers
	 *     description: Retrieve the top performing students
	 *     tags: [Gamification]
	 *     security:
	 *       - BearerAuth: []
	 *     parameters:
	 *       - in: query
	 *         name: limit
	 *         schema:
	 *           type: integer
	 *           default: 10
	 *         description: Number of top performers to return
	 *     responses:
	 *       200:
	 *         description: Top performers retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 type: object
	 *                 properties:
	 *                   studentId:
	 *                     type: number
	 *                   studentName:
	 *                     type: string
	 *                   totalPoints:
	 *                     type: number
	 *                   level:
	 *                     type: number
	 *                   badges:
	 *                     type: number
	 *                   activitiesCompleted:
	 *                     type: number
	 *                   streak:
	 *                     type: number
	 *       500:
	 *         description: Internal server error
	 */
	public async getTopPerformers(req: Request, res: Response) {
		try {
			const limit = req.query.limit ? +req.query.limit : 10;
			const result = await this.gamificationService.getTopPerformers(limit);
			this.sendHttpResponse(res, result);
		} catch (error) {
			console.error("Error getting top performers:", error);
			this.sendHttpResponse(res, { error: "Failed to get top performers" }, HttpStatusCode.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * @swagger
	 * /gamification/rank/me:
	 *   get:
	 *     summary: Get my rank
	 *     description: Retrieve the current user's rank in the leaderboard
	 *     tags: [Gamification]
	 *     security:
	 *       - BearerAuth: []
	 *     responses:
	 *       200:
	 *         description: User rank retrieved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 rank:
	 *                   type: number
	 *                   description: User's rank in leaderboard
	 *       404:
	 *         description: User not found in leaderboard
	 *       500:
	 *         description: Internal server error
	 */
	public async getMyRank(req: Request, res: Response) {
		try {
			const userId = (req as any).user?.user?.id as number;
			const rank = await this.gamificationService.getUserRank(userId);
			if (rank === null) {
				this.sendHttpResponse(res, { error: "User not found in leaderboard" }, HttpStatusCode.NOT_FOUND);
			}
			this.sendHttpResponse(res, { rank });
		} catch (error) {
			console.error("Error getting user rank:", error);
			this.sendHttpResponse(res, { error: "Failed to get user rank" }, HttpStatusCode.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * @swagger
	 * /gamification/achievements/check:
	 *   post:
	 *     summary: Check for new achievements
	 *     description: Check if the user has earned any new achievements
	 *     tags: [Gamification]
	 *     security:
	 *       - BearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Achievements checked successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 newAchievements:
	 *                   type: array
	 *                   items:
	 *                     type: object
	 *                     properties:
	 *                       name:
	 *                         type: string
	 *                       description:
	 *                         type: string
	 *                       earnedAt:
	 *                         type: string
	 *                         format: date-time
	 *       500:
	 *         description: Internal server error
	 */
	public async checkAchievements(req: Request, res: Response) {
		try {
			const userId = (req as any).user?.user?.id as number;
			const result = await this.gamificationService.checkAchievements(userId);
			this.sendHttpResponse(res, { newAchievements: result });
		} catch (error) {
			console.error("Error checking achievements:", error);
			this.sendHttpResponse(res, { error: "Failed to check achievements" }, HttpStatusCode.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * @swagger
	 * /gamification/badges/award:
	 *   post:
	 *     summary: Award badge to user
	 *     description: Award a specific badge to a user (admin/instructor only)
	 *     tags: [Gamification]
	 *     security:
	 *       - BearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             required:
	 *               - userId
	 *               - badgeName
	 *             properties:
	 *               userId:
	 *                 type: number
	 *                 description: User ID to award badge to
	 *               badgeName:
	 *                 type: string
	 *                 description: Name of the badge
	 *               badgeData:
	 *                 type: object
	 *                 description: Additional badge data
	 *     responses:
	 *       200:
	 *         description: Badge awarded successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Gamification'
	 *       400:
	 *         description: Bad request
	 *       500:
	 *         description: Internal server error
	 */
	public async awardBadge(req: Request, res: Response) {
		try {
			const { userId, badgeName, badgeData } = req.body;
			const result = await this.gamificationService.awardBadge(userId, badgeName, badgeData);
			this.sendHttpResponse(res, result);
		} catch (error) {
			console.error("Error awarding badge:", error);
			this.sendHttpResponse(res, { error: "Failed to award badge" }, HttpStatusCode.INTERNAL_SERVER_ERROR);
		}
	}
}
