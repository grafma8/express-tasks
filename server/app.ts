import { config } from "dotenv";
config({ path: "../.env" });

import express, { Request, Response, Router } from "express";
import { connectLogger } from "log4js";
import { systemLogger, accessLogger, errorLogger } from "./utils/log";

import * as baseController from "./controller/base";

const APP_PORT = process.env.APP_PORT || 3000;
const APP_PUBLIC_PATH = process.env.APP_PUBLIC_PATH || "./public";
const API_BASE_V1 = process.env.API_BASE_V1 || "/api/v1";

const app = express();

//         } else if (result !== null && result !== undefined) {
//             res.json(result);
//         }
//     });
// });
app.get(
  API_PATH_V1 + "/test",
  (req: express.Request, res: express.Response) => {
    res.json(req.body);
  }
);
app.use(connectLogger(accessLogger, {}));
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
