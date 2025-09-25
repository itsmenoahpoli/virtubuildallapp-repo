"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeApiRoutes = void 0;
const module_routers_1 = require("./module-routers");
const configs_1 = require("@/configs");
const types_1 = require("@/types");
const routesConfig = [
    {
        uri: "/system",
        router: module_routers_1.SystemRouter,
    },
    {
        uri: "/auth",
        router: new module_routers_1.AuthRouter().routerRoutes,
    },
    {
        uri: "/users",
        router: new module_routers_1.UsersRouter().routerRoutes,
    },
    {
        uri: "/user-roles",
        router: new module_routers_1.UserRolesRouter().routerRoutes,
    },
    {
        uri: "/modules",
        router: new module_routers_1.ModulesRouter().routerRoutes,
    },
    {
        uri: "/activities",
        router: new module_routers_1.ActivitiesRouter().routerRoutes,
    },
    {
        uri: "/assessments",
        router: new module_routers_1.AssessmentsRouter().routerRoutes,
    },
    {
        uri: "/grades",
        router: new module_routers_1.GradesRouter().routerRoutes,
    },
    {
        uri: "/analytics",
        router: new module_routers_1.AnalyticsRouter().routerRoutes,
    },
    {
        uri: "/activations",
        router: new module_routers_1.ActivationsRouter().routerRoutes,
    },
    {
        uri: "/admin",
        router: new module_routers_1.AdminRouter().routerRoutes,
    },
    {
        uri: "/student-groups",
        router: new module_routers_1.StudentGroupsRouter().routerRoutes,
    },
    {
        uri: "/student-progress",
        router: new module_routers_1.StudentProgressRouter().routerRoutes,
    },
    {
        uri: "/simulations",
        router: new module_routers_1.SimulationsRouter().routerRoutes,
    },
    {
        uri: "/gamification",
        router: new module_routers_1.GamificationRouter().routerRoutes,
    },
    {
        uri: "/assessment-submissions",
        router: new module_routers_1.AssessmentSubmissionsRouter().routerRoutes,
    },
];
const printRouteRoutes = (route) => {
    const uriModule = route.uri.replace("/", "").toUpperCase();
    console.log("--------------------------------------------------------------------------------------");
    console.log(`${uriModule} ${route.uri} Routes \n---------------`);
    route.router.stack.forEach((stack) => {
        if (stack.route) {
            // @ts-ignore
            const methods = Object.keys(stack.route?.methods).join(", ").toUpperCase();
            console.log(`${methods} ${route.uri}${stack.route.path}`);
        }
    });
    console.log("--------------------------------------------------------------------------------------");
};
const initializeApiRoutes = (app, apiPrefix = "/api") => {
    routesConfig.forEach((route) => {
        const uri = apiPrefix.concat(route.uri);
        app.use(uri, route.router);
        if (configs_1.SETTINGS.checkCurrentEnvironment(types_1.AppEnvironments.DEV)) {
            printRouteRoutes(route);
        }
    });
};
exports.initializeApiRoutes = initializeApiRoutes;
