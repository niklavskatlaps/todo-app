import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";

import * as http from "http";
import bodyParser from "body-parser";
import express from "express";

import { createDatabaseConnection } from "./database";
import { initializeSocket } from "./socket";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";
import { apiRouter } from "./routes/api.router";
import { healthcheckRouter } from "./routes/healthcheck.router";

const app = express();
const server = http.createServer(app);

createDatabaseConnection().catch(console.error);
const attachSocketToReqMiddleware = initializeSocket(server);

app.use(attachSocketToReqMiddleware);
app.use(bodyParser.json());
app.use("/healthcheck", healthcheckRouter);
app.use("/api", apiRouter);
app.use(errorHandlerMiddleware);

const port = +(process.env.PORT || "8080");
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
