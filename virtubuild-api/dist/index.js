"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_bootstrap_1 = require("./src/app.bootstrap");
try {
    (0, app_bootstrap_1.runApp)();
}
catch (error) {
    console.error(`[ERROR]: Failed to start application server`);
}
