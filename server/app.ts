import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
// import {Routes} from "./routes";
import { User } from "./domain/entity/User";
import logger from "morgan";

const API_PATH_V1 = process.env.API_PATH_V1;

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("short"));

// createConnection().then(async connection => {

// register express routes from defined application routes
// Routes.forEach(route => {
//     (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
//         const result = (new (route.controller as any))[route.action](req, res, next);
//         if (result instanceof Promise) {
//             result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

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

// }).catch(error => console.log(error));

// router.get(
//   API_PATH_V1 + "/users/:id",
//   (req: express.Request, res: express.Response) => {
//     res.json({ body: req.body, id: req.params.id });
//   }
// );

// app.use(router);
// app.listen(APP_PORT, () => {
//   console.log(`app listening on port ${APP_PORT}`);
// });
