import { config } from "dotenv";
config({ path: "../.env" });

import express, { Request, Response, Router } from "express";
import bodyParser from "body-parser";
import favicon from "serve-favicon";
import serveStatic from "serve-static";
import { connectLogger } from "log4js";
import { systemLogger, accessLogger, errorLogger } from "./utils/log";

import * as baseController from "./controller/base";

const APP_PORT = process.env.APP_PORT || 3000;
const APP_PUBLIC_PATH = process.env.APP_PUBLIC_PATH || "./public";
const API_BASE_V1 = process.env.API_BASE_V1 || "/api/v1";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
);
app.use(connectLogger(accessLogger, {}));
app.use(favicon("./public/assets/img/favicon.ico"));
app.use(serveStatic(APP_PUBLIC_PATH));
const routerBase: Router = express.Router();

routerBase.get("/", baseController.getIndex);
routerBase.get("/ping", baseController.getPing);
routerBase.get(API_BASE_V1 + "/ping", baseController.getPing);

app.use(routerBase);

// errors
app.use((err: Error, req: Request, res: Response, next: any): void => {
  errorLogger.error(err);
  res.status(500).send("Internal Server Error");
  next(err);
});

export default app;
