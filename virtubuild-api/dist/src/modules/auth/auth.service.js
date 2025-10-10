"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_service_1 = require("../../modules/users/users.service");
const utils_1 = require("../../utils");
const configs_1 = require("../../configs");
const database_1 = require("../../database");
class AuthService {
    usersService;
    constructor() {
        this.usersService = new users_service_1.UsersService();
    }
    async signinAccount(credentials) {
        const user = await this.usersService.findByEmail(credentials.email);
        const isPasswordVerified = user ? await (0, utils_1.verifyPassword)(credentials.password, user?.password) : false;
        if (!user || !isPasswordVerified) {
            return null;
        }
        delete user.password;
        let roleName = undefined;
        if (user.userRoleId) {
            const role = await database_1.userRolesRepository.findOneBy({ id: user.userRoleId });
            roleName = role?.name;
        }
        const authToken = jsonwebtoken_1.default.sign({ user: { ...user, roleName } }, configs_1.SETTINGS.APP_JWT_SECRET_KEY, { expiresIn: "1h" });
        return {
            authToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.firstName + (user.middleName ? ' ' + user.middleName : '') + ' ' + user.lastName,
                firstName: user.firstName,
                lastName: user.lastName,
                roleName: roleName,
                avatar: null
            }
        };
    }
    async signupAccount(accountData) {
        const user = await this.usersService.findByEmail(accountData.email);
        if (user) {
            return {
                accountExists: true,
            };
        }
        const createUser = await this.usersService.createUser({
            ...accountData,
            isEnabled: true,
            isEmailVerified: false,
            twoFactorEnabled: false,
            failedLoginAttempts: 0
        });
        delete createUser.password;
        return {
            accountExists: false,
            user: createUser,
        };
    }
    async requestOtp(data) {
        //
    }
}
exports.AuthService = AuthService;
