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
}
exports.UsersService = UsersService;
