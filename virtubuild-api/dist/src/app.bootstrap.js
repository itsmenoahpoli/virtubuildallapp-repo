"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.runApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// removed sentry import for tests
const routers_1 = require("./routers");
const middlewares_1 = require("./middlewares");
const database_1 = require("./database");
const configs_1 = require("./configs");
const types_1 = require("./types");
const swagger_config_1 = require("./configs/swagger.config");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
let server;
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
const corsOrigin = process.env.CORS_ORIGIN || "*";
const corsOptions = {
    origin: corsOrigin === "*" ? true : corsOrigin.split(",").map((o) => o.trim()),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
app.options("*", (0, cors_1.default)(corsOptions));
app.disable("powered-by");
(0, middlewares_1.initializeMiddlewares)(app);
app.use(middlewares_1.GlobalErrorHandlerMiddleware);
app.use("/api-docs", swagger_config_1.swaggerUi.serve, swagger_config_1.swaggerUi.setup(swagger_config_1.swaggerSpec, swagger_config_1.swaggerUiOptions));
const gracefulShutdown = (signal) => {
    console.log(`\n[SHUTDOWN]: Received ${signal}. Starting graceful shutdown...`);
    if (server) {
        server.close((err) => {
            if (err) {
                console.error(`[SHUTDOWN]: Error closing server:`, err);
                process.exit(1);
            }
            console.log(`[SHUTDOWN]: Server closed successfully`);
            if (database_1.DBDataSource.isInitialized) {
                database_1.DBDataSource.destroy()
                    .then(() => {
                    console.log(`[SHUTDOWN]: Database connection closed`);
                    process.exit(0);
                })
                    .catch((error) => {
                    console.error(`[SHUTDOWN]: Error closing database:`, error);
                    process.exit(1);
                });
            }
            else {
                process.exit(0);
            }
        });
        setTimeout(() => {
            console.error(`[SHUTDOWN]: Forceful shutdown after timeout`);
            process.exit(1);
        }, 10000);
    }
    else {
        process.exit(0);
    }
};
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', (error) => {
    console.error(`[ERROR]: Uncaught Exception:`, error);
    gracefulShutdown('uncaughtException');
});
process.on('unhandledRejection', (reason, promise) => {
    console.error(`[ERROR]: Unhandled Rejection at:`, promise, 'reason:', reason);
    gracefulShutdown('unhandledRejection');
});
const runApp = async () => {
    try {
        // Initialize database first
        console.info(`[INIT]: Initializing database...`);
        await (0, database_1.initializeDatabase)();
        console.info(`[INIT]: Database initialized successfully`);
        // Then initialize routes
        (0, routers_1.initializeApiRoutes)(app);
        console.info(`[INIT]: API routes initialized`);
        const appPort = configs_1.SETTINGS.APP_PORT;
        if (!appPort) {
            console.error(`[ERROR]: No app port specified from settings`);
            return;
        }
        server = app.listen(appPort, "0.0.0.0", () => {
            if (configs_1.SETTINGS.APP_ENV === types_1.AppEnvironments.DEV) {
                console.info(`[APP]: App started and running in ${configs_1.SETTINGS.APP_URL}`);
                console.info(`[SWAGGER]: API documentation available at ${configs_1.SETTINGS.APP_URL}/api-docs`);
                console.info(`[INFO]: Press Ctrl+C to stop the server`);
            }
        });
    }
    catch (error) {
        console.error(`[ERROR]: Failed to initialize application:`, error);
        throw error;
    }
};
exports.runApp = runApp;
