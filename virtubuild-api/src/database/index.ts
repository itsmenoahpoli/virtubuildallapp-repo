import { DataSource, Repository, type DataSourceOptions } from "typeorm";
import { User as UserEntity, UserRole as UserRoleEntity, Module as ModuleEntity, LabActivity as LabActivityEntity, Assessment as AssessmentEntity, Grade as GradeEntity, PerformanceAnalytics as PerformanceAnalyticsEntity, ModuleActivation as ModuleActivationEntity } from "./entities";
import { SETTINGS } from "@/configs";

const createDatabaseIfNotExists = async () => {
  const tempDataSource = new DataSource({
    type: SETTINGS.APP_DB_TYPE,
    host: SETTINGS.APP_DB_HOST,
    port: Number(SETTINGS.APP_DB_PORT),
    username: SETTINGS.APP_DB_USERNAME,
    password: SETTINGS.APP_DB_PASSWORD,
    database: SETTINGS.APP_DB_TYPE,
    extra: {
      charset: "utf8mb4",
    },
  } as DataSourceOptions);

  try {
    await tempDataSource.initialize();
    await tempDataSource.query(`CREATE DATABASE ${SETTINGS.APP_DB_DATABASE}`);
    await tempDataSource.destroy();
  } catch (error: any) {
    if (error.code !== "42P04") {
      console.error("Error creating database:", error);
    }
  }
};

const DBDataSource = new DataSource({
  type: SETTINGS.APP_DB_TYPE,
  host: SETTINGS.APP_DB_HOST,
  port: Number(SETTINGS.APP_DB_PORT),
  username: SETTINGS.APP_DB_USERNAME,
  password: SETTINGS.APP_DB_PASSWORD,
  database: SETTINGS.APP_DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [__dirname + "/entities/*.entity.ts"],
  migrations: [__dirname + "/migrations/*.migration.ts"],
  subscribers: [],
  extra: {
    charset: "utf8mb4",
  },
} as DataSourceOptions);

let usersRepository: Repository<UserEntity>;
let userRolesRepository: Repository<UserRoleEntity>;
let modulesRepository: Repository<ModuleEntity>;
let labActivitiesRepository: Repository<LabActivityEntity>;
let assessmentsRepository: Repository<AssessmentEntity>;
let gradesRepository: Repository<GradeEntity>;
let performanceAnalyticsRepository: Repository<PerformanceAnalyticsEntity>;
let moduleActivationsRepository: Repository<ModuleActivationEntity>;

const initializeDatabase = async () => {
  await createDatabaseIfNotExists();

  return DBDataSource.initialize()
    .then(() => {
      console.info("Database successfully synced!");
      usersRepository = DBDataSource.getRepository(UserEntity);
      userRolesRepository = DBDataSource.getRepository(UserRoleEntity);
      modulesRepository = DBDataSource.getRepository(ModuleEntity);
      labActivitiesRepository = DBDataSource.getRepository(LabActivityEntity);
      assessmentsRepository = DBDataSource.getRepository(AssessmentEntity);
      gradesRepository = DBDataSource.getRepository(GradeEntity);
      performanceAnalyticsRepository = DBDataSource.getRepository(PerformanceAnalyticsEntity);
      moduleActivationsRepository = DBDataSource.getRepository(ModuleActivationEntity);
    })
    .catch((error) => {
      console.error("Failed to sync database");
      console.error(error);
    });
};

export {
  DBDataSource,
  initializeDatabase,
  usersRepository,
  UserEntity,
  userRolesRepository,
  UserRoleEntity,
  modulesRepository,
  ModuleEntity,
  labActivitiesRepository,
  LabActivityEntity,
  assessmentsRepository,
  AssessmentEntity,
  gradesRepository,
  GradeEntity,
  performanceAnalyticsRepository,
  PerformanceAnalyticsEntity,
  moduleActivationsRepository,
  ModuleActivationEntity,
};
