"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const database_1 = require("../../database");
const utils_1 = require("../../utils");
class UsersService {
    async findByEmail(email) {
        const user = await database_1.usersRepository.findOneBy({ email });
        return user;
    }
    async createUser(data) {
        const user = database_1.usersRepository.create({
            ...data,
            password: await (0, utils_1.encryptPassword)(data.password),
        });
        await database_1.usersRepository.save(user);
        return user;
    }
    async fetchList(filters) {
        const { page = 1, limit = 10, search, userRoleId, isEnabled } = filters;
        const queryBuilder = database_1.usersRepository.createQueryBuilder("user");
        if (search) {
            queryBuilder.where("user.firstName ILIKE :search OR user.lastName ILIKE :search OR user.email ILIKE :search", { search: `%${search}%` });
        }
        if (userRoleId) {
            queryBuilder.andWhere("user.userRoleId = :userRoleId", { userRoleId });
        }
        if (isEnabled !== undefined) {
            queryBuilder.andWhere("user.isEnabled = :isEnabled", { isEnabled });
        }
        const [users, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            data: users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    async fetchById(id) {
        const user = await database_1.usersRepository.findOneBy({ id });
        return user;
    }
    async updateById(id, data) {
        const user = await database_1.usersRepository.findOneBy({ id });
        if (!user)
            return null;
        if (data.password) {
            data.password = await (0, utils_1.encryptPassword)(data.password);
        }
        Object.assign(user, data);
        await database_1.usersRepository.save(user);
        return user;
    }
    async deleteById(id) {
        const result = await database_1.usersRepository.delete({ id });
        return result.affected !== 0;
    }
}
exports.UsersService = UsersService;
