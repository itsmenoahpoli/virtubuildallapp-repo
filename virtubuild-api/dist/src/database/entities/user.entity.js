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
exports.User = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const shared_entity_1 = require("./shared.entity");
const user_role_entity_1 = require("./user-role.entity");
let User = class User extends shared_entity_1.DateFieldsEntity {
    id;
    userRoleId;
    userRole;
    firstName;
    middleName;
    lastName;
    email;
    password;
    isEnabled;
    isEmailVerified;
    twoFactorEnabled;
    twoFactorSecret;
    lastLoginAt;
    lastLoginIp;
    failedLoginAttempts;
    lockedUntil;
    passwordResetToken;
    passwordResetExpires;
    emailVerificationToken;
    emailVerificationExpires;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], User.prototype, "userRoleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_role_entity_1.UserRole, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userRoleId' }),
    __metadata("design:type", user_role_entity_1.UserRole)
], User.prototype, "userRole", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "middleName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isEnabled", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "twoFactorEnabled", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "twoFactorSecret", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        nullable: true,
    }),
    __metadata("design:type", Date)
], User.prototype, "lastLoginAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 45,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "lastLoginIp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        default: 0,
    }),
    __metadata("design:type", Number)
], User.prototype, "failedLoginAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        nullable: true,
    }),
    __metadata("design:type", Date)
], User.prototype, "lockedUntil", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "passwordResetToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        nullable: true,
    }),
    __metadata("design:type", Date)
], User.prototype, "passwordResetExpires", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "emailVerificationToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        nullable: true,
    }),
    __metadata("design:type", Date)
], User.prototype, "emailVerificationExpires", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
