"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemController = void 0;
const types_1 = require("@/types");
exports.SystemController = {
    /**
     * @swagger
     * /system/healthcheck:
     *   get:
     *     summary: System health check
     *     description: Check if the system is online and responding
     *     tags: [System]
     *     responses:
     *       200:
     *         description: System is online
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "SYSTEM_ONLINE"
     */
    healthcheck: (request, response, next) => {
        response
            .status(types_1.HttpStatusCode.OK)
            .json({
            message: "SYSTEM_ONLINE",
        })
            .send();
    },
};
