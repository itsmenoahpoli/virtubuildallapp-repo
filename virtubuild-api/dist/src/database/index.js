"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemSettingsEntity = exports.systemSettingsRepository = exports.NotificationPreferenceEntity = exports.notificationPreferencesRepository = exports.NotificationEntity = exports.notificationsRepository = exports.AuditLogEntity = exports.auditLogsRepository = exports.AssessmentSubmissionEntity = exports.assessmentSubmissionsRepository = exports.ModulePrerequisiteEntity = exports.modulePrerequisitesRepository = exports.GamificationEntity = exports.gamificationRepository = exports.SimulationEntity = exports.simulationsRepository = exports.StudentProgressEntity = exports.studentProgressRepository = exports.StudentGroupAssignmentEntity = exports.studentGroupAssignmentsRepository = exports.StudentGroupEntity = exports.studentGroupsRepository = exports.ModuleActivationEntity = exports.moduleActivationsRepository = exports.PerformanceAnalyticsEntity = exports.performanceAnalyticsRepository = exports.GradeEntity = exports.gradesRepository = exports.AssessmentEntity = exports.assessmentsRepository = exports.LabActivityEntity = exports.labActivitiesRepository = exports.ModuleEntity = exports.modulesRepository = exports.UserRoleEntity = exports.userRolesRepository = exports.UserEntity = exports.usersRepository = exports.initializeDatabase = exports.DBDataSource = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("./entities");
Object.defineProperty(exports, "UserEntity", { enumerable: true, get: function () { return entities_1.User; } });
Object.defineProperty(exports, "UserRoleEntity", { enumerable: true, get: function () { return entities_1.UserRole; } });
Object.defineProperty(exports, "ModuleEntity", { enumerable: true, get: function () { return entities_1.Module; } });
Object.defineProperty(exports, "LabActivityEntity", { enumerable: true, get: function () { return entities_1.LabActivity; } });
Object.defineProperty(exports, "AssessmentEntity", { enumerable: true, get: function () { return entities_1.Assessment; } });
Object.defineProperty(exports, "GradeEntity", { enumerable: true, get: function () { return entities_1.Grade; } });
Object.defineProperty(exports, "PerformanceAnalyticsEntity", { enumerable: true, get: function () { return entities_1.PerformanceAnalytics; } });
Object.defineProperty(exports, "ModuleActivationEntity", { enumerable: true, get: function () { return entities_1.ModuleActivation; } });
Object.defineProperty(exports, "StudentGroupEntity", { enumerable: true, get: function () { return entities_1.StudentGroup; } });
Object.defineProperty(exports, "StudentGroupAssignmentEntity", { enumerable: true, get: function () { return entities_1.StudentGroupAssignment; } });
Object.defineProperty(exports, "StudentProgressEntity", { enumerable: true, get: function () { return entities_1.StudentProgress; } });
Object.defineProperty(exports, "SimulationEntity", { enumerable: true, get: function () { return entities_1.Simulation; } });
Object.defineProperty(exports, "GamificationEntity", { enumerable: true, get: function () { return entities_1.Gamification; } });
Object.defineProperty(exports, "ModulePrerequisiteEntity", { enumerable: true, get: function () { return entities_1.ModulePrerequisite; } });
Object.defineProperty(exports, "AssessmentSubmissionEntity", { enumerable: true, get: function () { return entities_1.AssessmentSubmission; } });
Object.defineProperty(exports, "AuditLogEntity", { enumerable: true, get: function () { return entities_1.AuditLog; } });
Object.defineProperty(exports, "NotificationEntity", { enumerable: true, get: function () { return entities_1.Notification; } });
Object.defineProperty(exports, "NotificationPreferenceEntity", { enumerable: true, get: function () { return entities_1.NotificationPreference; } });
Object.defineProperty(exports, "SystemSettingsEntity", { enumerable: true, get: function () { return entities_1.SystemSettings; } });
const configs_1 = require("@/configs");
const createDatabaseIfNotExists = async () => {
    const tempDataSource = new typeorm_1.DataSource({
        type: configs_1.SETTINGS.APP_DB_TYPE,
        host: configs_1.SETTINGS.APP_DB_HOST,
        port: Number(configs_1.SETTINGS.APP_DB_PORT),
        username: configs_1.SETTINGS.APP_DB_USERNAME,
        password: configs_1.SETTINGS.APP_DB_PASSWORD,
        database: configs_1.SETTINGS.APP_DB_TYPE,
        extra: {
            charset: "utf8mb4",
        },
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
    entities: [entities_1.User, entities_1.UserRole, entities_1.Module, entities_1.LabActivity, entities_1.Assessment, entities_1.Grade, entities_1.PerformanceAnalytics, entities_1.ModuleActivation, entities_1.StudentGroup, entities_1.StudentGroupAssignment, entities_1.StudentProgress, entities_1.Simulation, entities_1.Gamification, entities_1.ModulePrerequisite, entities_1.AssessmentSubmission, entities_1.AuditLog, entities_1.Notification, entities_1.NotificationPreference, entities_1.SystemSettings],
    migrations: [__dirname + "/migrations/*.migration.ts"],
    subscribers: [],
    extra: {
        charset: "utf8mb4",
    },
});
exports.DBDataSource = DBDataSource;
let usersRepository;
let userRolesRepository;
let modulesRepository;
let labActivitiesRepository;
let assessmentsRepository;
let gradesRepository;
let performanceAnalyticsRepository;
let moduleActivationsRepository;
let studentGroupsRepository;
let studentGroupAssignmentsRepository;
let studentProgressRepository;
let simulationsRepository;
let gamificationRepository;
let modulePrerequisitesRepository;
let assessmentSubmissionsRepository;
let auditLogsRepository;
let notificationsRepository;
let notificationPreferencesRepository;
let systemSettingsRepository;
const initializeDatabase = async () => {
    await createDatabaseIfNotExists();
    return DBDataSource.initialize()
        .then(() => {
        console.info("Database successfully synced!");
        exports.usersRepository = usersRepository = DBDataSource.getRepository(entities_1.User);
        exports.userRolesRepository = userRolesRepository = DBDataSource.getRepository(entities_1.UserRole);
        exports.modulesRepository = modulesRepository = DBDataSource.getRepository(entities_1.Module);
        exports.labActivitiesRepository = labActivitiesRepository = DBDataSource.getRepository(entities_1.LabActivity);
        exports.assessmentsRepository = assessmentsRepository = DBDataSource.getRepository(entities_1.Assessment);
        exports.gradesRepository = gradesRepository = DBDataSource.getRepository(entities_1.Grade);
        exports.performanceAnalyticsRepository = performanceAnalyticsRepository = DBDataSource.getRepository(entities_1.PerformanceAnalytics);
        exports.moduleActivationsRepository = moduleActivationsRepository = DBDataSource.getRepository(entities_1.ModuleActivation);
        exports.studentGroupsRepository = studentGroupsRepository = DBDataSource.getRepository(entities_1.StudentGroup);
        exports.studentGroupAssignmentsRepository = studentGroupAssignmentsRepository = DBDataSource.getRepository(entities_1.StudentGroupAssignment);
        exports.studentProgressRepository = studentProgressRepository = DBDataSource.getRepository(entities_1.StudentProgress);
        exports.simulationsRepository = simulationsRepository = DBDataSource.getRepository(entities_1.Simulation);
        exports.gamificationRepository = gamificationRepository = DBDataSource.getRepository(entities_1.Gamification);
        exports.modulePrerequisitesRepository = modulePrerequisitesRepository = DBDataSource.getRepository(entities_1.ModulePrerequisite);
        exports.assessmentSubmissionsRepository = assessmentSubmissionsRepository = DBDataSource.getRepository(entities_1.AssessmentSubmission);
        exports.auditLogsRepository = auditLogsRepository = DBDataSource.getRepository(entities_1.AuditLog);
        exports.notificationsRepository = notificationsRepository = DBDataSource.getRepository(entities_1.Notification);
        exports.notificationPreferencesRepository = notificationPreferencesRepository = DBDataSource.getRepository(entities_1.NotificationPreference);
        exports.systemSettingsRepository = systemSettingsRepository = DBDataSource.getRepository(entities_1.SystemSettings);
    })
        .catch((error) => {
        console.error("Failed to sync database");
        console.error(error);
    });
};
exports.initializeDatabase = initializeDatabase;
