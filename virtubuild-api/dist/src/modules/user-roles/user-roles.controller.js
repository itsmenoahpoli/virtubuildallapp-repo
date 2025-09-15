"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolesController = void 0;
const base_controller_1 = require("../../modules/base.controller");
const user_roles_service_1 = require("./user-roles.service");
const decorators_1 = require("../../decorators");
const utils_1 = require("../../utils");
const types_1 = require("../../types");
const user_role_dto_1 = require("./user-role.dto");
class UserRolesController extends base_controller_1.BaseController {
    userRolesService;
    constructor() {
        super();
        this.userRolesService = new user_roles_service_1.UserRolesService();
        this.bindClassMethods(this);
    }
    /**
     * @swagger
     * /user-roles:
     *   get:
     *     summary: Get all user roles
     *     description: Retrieve a list of all user roles with optional filtering
     *     tags: [User Roles]
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           default: 1
     *         description: Page number for pagination
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           default: 10
     *         description: Number of items per page
     *       - in: query
     *         name: search
     *         schema:
     *           type: string
     *         description: Search term for filtering roles
     *     responses:
     *       200:
     *         description: List of user roles retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessResponse'
     */
    async fetchListHandler(request, response, next) {
        const filtersFromQuery = this.generateListFilters(request.query);
        const result = await this.userRolesService.fetchList(filtersFromQuery);
        return (0, utils_1.SendHttpResponse)(response, result, types_1.HttpStatusCode.OK);
    }
    /**
     * @swagger
     * /user-roles/{id}:
     *   get:
     *     summary: Get user role by ID
     *     description: Retrieve a specific user role by its ID
     *     tags: [User Roles]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: User role ID
     *     responses:
     *       200:
     *         description: User role retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessResponse'
     *       404:
     *         description: User role not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    async fetchByIdHandler(request, response, next) {
        //
    }
    /**
     * @swagger
     * /user-roles/{id}:
     *   patch:
     *     summary: Update user role
     *     description: Update an existing user role by ID
     *     tags: [User Roles]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: User role ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserRole'
     *     responses:
     *       200:
     *         description: User role updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessResponse'
     *       404:
     *         description: User role not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       422:
     *         description: Validation error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    async updateByIdHandler(request, response, next) {
        const result = await this.userRolesService.updateById(+request.params?.id, request.body);
        return (0, utils_1.SendHttpResponse)(response, result, types_1.HttpStatusCode.OK);
    }
    /**
     * @swagger
     * /user-roles/{id}:
     *   delete:
     *     summary: Delete user role
     *     description: Delete a user role by ID
     *     tags: [User Roles]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: User role ID
     *     responses:
     *       200:
     *         description: User role deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessResponse'
     *       404:
     *         description: User role not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    async deleteByIdHandler(request, response, next) {
        const result = await this.userRolesService.deleteById(+request.params?.id);
        return (0, utils_1.SendHttpResponse)(response, result, types_1.HttpStatusCode.OK);
    }
    /**
     * @swagger
     * /user-roles:
     *   post:
     *     summary: Create new user role
     *     description: Create a new user role
     *     tags: [User Roles]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserRole'
     *     responses:
     *       201:
     *         description: User role created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessResponse'
     *       422:
     *         description: Role already exists or validation error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    async createHandler(request, response, next) {
        const result = await this.userRolesService.create(request.body);
        if (!result) {
            return (0, utils_1.SendHttpResponse)(response, "ALREADY_EXISTS", types_1.HttpStatusCode.UNPROCESSABLE_ENTITY);
        }
        return (0, utils_1.SendHttpResponse)(response, result, types_1.HttpStatusCode.CREATED);
    }
}
exports.UserRolesController = UserRolesController;
__decorate([
    (0, decorators_1.ValidateUrlParams)("id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "fetchByIdHandler", null);
__decorate([
    (0, decorators_1.ValidateUrlParams)("id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "updateByIdHandler", null);
__decorate([
    (0, decorators_1.ValidateUrlParams)("id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "deleteByIdHandler", null);
__decorate([
    (0, decorators_1.ValidatePayload)(user_role_dto_1.UserRoleDTO),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "createHandler", null);
