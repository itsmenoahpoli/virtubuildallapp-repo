"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolesService = void 0;
const database_1 = require("@/database");
class UserRolesService {
    async fetchList(query) {
        return database_1.userRolesRepository.find({ withDeleted: query.withDeleted });
    }
    async fetchById(id) {
        const role = database_1.userRolesRepository.findOneBy({ id });
        return role;
    }
    async updateById(id, data) {
        const role = await database_1.userRolesRepository.update(id, data);
        if (role.affected) {
            return await this.fetchById(id);
        }
        return null;
    }
    async deleteById(id) {
        const role = database_1.userRolesRepository.softDelete(id);
        return role;
    }
    async create(data) {
        if (await this.checkRoleExistence(data.name)) {
            return null;
        }
        const role = database_1.userRolesRepository.create(data);
        await database_1.userRolesRepository.save(role);
        return role;
    }
    async checkRoleExistence(name) {
        const role = await database_1.userRolesRepository.findOneBy({ name });
        return role !== null;
    }
}
exports.UserRolesService = UserRolesService;
