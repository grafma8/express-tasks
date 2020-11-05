import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
// import {Routes} from "./routes";
import { User } from "./domain/entity/User";
import logger from "morgan";

import { connectLogger } from "log4js";
import { systemLogger, accessLogger, errorLogger } from "./utils/log";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("short"));

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

// }).catch(error => console.log(error));

// errors
app.use((err: Error, req: Request, res: Response, next: any): void => {
  errorLogger.error(err);
  res.status(500).send("Internal Server Error");
  next(err);
});

export default app;
