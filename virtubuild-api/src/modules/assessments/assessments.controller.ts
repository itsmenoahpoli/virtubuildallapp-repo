import { type Request, type Response, type NextFunction } from "express";
import { BaseController } from "@/modules/base.controller";
import { AssessmentsService } from "./assessments.service";
import { HttpStatusCode } from "@/types";
import { SendHttpResponse } from "@/utils";

export class AssessmentsController extends BaseController {
	public assessmentsService: AssessmentsService;

	constructor() {
		super();
		this.assessmentsService = new AssessmentsService();
		this.bindClassMethods(this);
	}

	/**
	 * @swagger
	 * /assessments/module/{moduleId}:
	 *   get:
	 *     summary: Get post-lab assessment by module
	 *     tags: [Assessments]
	 *     security:
	 *       - BearerAuth: []
	 */
	public async getByModuleHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		const result = await this.assessmentsService.getByModule(+request.params.moduleId);
		return SendHttpResponse(response, result, HttpStatusCode.OK);
	}

	/**
	 * @swagger
	 * /assessments/module/{moduleId}:
	 *   put:
	 *     summary: Upsert post-lab assessment by module (instructor)
	 *     tags: [Assessments]
	 *     security:
	 *       - BearerAuth: []
	 */
	public async upsertHandler(request: Request, response: Response, next: NextFunction): Promise<any> {
		const result = await this.assessmentsService.upsert(+request.params.moduleId, request.body);
		return SendHttpResponse(response, result, HttpStatusCode.OK);
	}
}


