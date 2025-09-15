"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleEntity = exports.userRolesRepository = exports.UserEntity = exports.usersRepository = exports.initializeDatabase = exports.DBDataSource = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("./entities");
Object.defineProperty(exports, "UserEntity", { enumerable: true, get: function () { return entities_1.User; } });
Object.defineProperty(exports, "UserRoleEntity", { enumerable: true, get: function () { return entities_1.UserRole; } });
const configs_1 = require("../configs");
const createDatabaseIfNotExists = async () => {
    const tempDataSource = new typeorm_1.DataSource({
        type: configs_1.SETTINGS.APP_DB_TYPE,
        host: configs_1.SETTINGS.APP_DB_HOST,
        port: Number(configs_1.SETTINGS.APP_DB_PORT),
        username: configs_1.SETTINGS.APP_DB_USERNAME,
        password: configs_1.SETTINGS.APP_DB_PASSWORD,
        database: "postgres",
    });
    try {
        await tempDataSource.initialize();
        await tempDataSource.query(`CREATE DATABASE ${configs_1.SETTINGS.APP_DB_DATABASE}`);
        await tempDataSource.destroy();
    }
    catch (error) {
        if (error.code !== "42P04") {
            console.error("Error creating database:", error);
        }
    }
};
const DBDataSource = new typeorm_1.DataSource({
    type: configs_1.SETTINGS.APP_DB_TYPE,
    host: configs_1.SETTINGS.APP_DB_HOST,
    port: Number(configs_1.SETTINGS.APP_DB_PORT),
    username: configs_1.SETTINGS.APP_DB_USERNAME,
    password: configs_1.SETTINGS.APP_DB_PASSWORD,
    database: configs_1.SETTINGS.APP_DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [__dirname + "/entities/*.entity.ts"],
    migrations: [__dirname + "/migrations/*.migration.ts"],
    subscribers: [],
});
exports.DBDataSource = DBDataSource;
let usersRepository;
let userRolesRepository;
const initializeDatabase = async () => {
    await createDatabaseIfNotExists();
    DBDataSource.initialize()
        .then(() => {
        console.info("Database successfully synced!");
        exports.usersRepository = usersRepository = DBDataSource.getRepository(entities_1.User);
        exports.userRolesRepository = userRolesRepository = DBDataSource.getRepository(entities_1.UserRole);
    })
        .catch((error) => {
        console.error("Failed to sync database");
        console.error(error);
    });
};
exports.initializeDatabase = initializeDatabase;
