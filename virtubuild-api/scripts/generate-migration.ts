import "reflect-metadata";
import { DataSource } from "typeorm";
import { SETTINGS } from "../src/configs";
import { User as UserEntity, UserRole as UserRoleEntity, Module as ModuleEntity, LabActivity as LabActivityEntity, Assessment as AssessmentEntity, Grade as GradeEntity, PerformanceAnalytics as PerformanceAnalyticsEntity, ModuleActivation as ModuleActivationEntity, StudentGroup as StudentGroupEntity, StudentGroupAssignment as StudentGroupAssignmentEntity, StudentProgress as StudentProgressEntity, Simulation as SimulationEntity, Gamification as GamificationEntity, ModulePrerequisite as ModulePrerequisiteEntity, AssessmentSubmission as AssessmentSubmissionEntity, AuditLog as AuditLogEntity, Notification as NotificationEntity, NotificationPreference as NotificationPreferenceEntity, SystemSettings as SystemSettingsEntity } from "../src/database/entities";

const AppDataSource = new DataSource({
  type: SETTINGS.APP_DB_TYPE,
  host: SETTINGS.APP_DB_HOST,
  port: Number(SETTINGS.APP_DB_PORT),
  username: SETTINGS.APP_DB_USERNAME,
  password: SETTINGS.APP_DB_PASSWORD,
  database: SETTINGS.APP_DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [
    UserEntity, 
    UserRoleEntity, 
    ModuleEntity, 
    LabActivityEntity, 
    AssessmentEntity, 
    GradeEntity, 
    PerformanceAnalyticsEntity, 
    ModuleActivationEntity, 
    StudentGroupEntity, 
    StudentGroupAssignmentEntity, 
    StudentProgressEntity, 
    SimulationEntity, 
    GamificationEntity, 
    ModulePrerequisiteEntity, 
    AssessmentSubmissionEntity, 
    AuditLogEntity, 
    NotificationEntity, 
    NotificationPreferenceEntity, 
    SystemSettingsEntity
  ],
  migrations: [__dirname + "/../src/database/migrations/*.ts"],
  subscribers: [],
});

async function generateMigration() {
  try {
    console.log("Initializing database connection...");
    await AppDataSource.initialize();
    
    const migrationName = process.argv[2];
    if (!migrationName) {
      console.error("❌ Please provide a migration name:");
      console.error("Usage: npm run migration:generate <migration-name>");
      process.exit(1);
    }
    
    console.log(`Generating migration: ${migrationName}`);
    const migration = await AppDataSource.generateMigration({
      name: migrationName,
      outputDir: __dirname + "/../src/database/migrations"
    });
    
    if (migration) {
      console.log(`✅ Migration generated successfully: ${migration.name}`);
      console.log(`📁 Location: ${migration.path}`);
    } else {
      console.log("ℹ️  No changes detected. No migration generated.");
    }
    
    await AppDataSource.destroy();
    
  } catch (error) {
    console.error("❌ Migration generation failed:", error);
    process.exit(1);
  }
}

generateMigration();
