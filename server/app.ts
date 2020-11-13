import { config } from "dotenv";
config({ path: "../.env" });

import express, { Request, Response, NextFunction, Router } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import csrf from "csurf";
import session from "express-session";
import favicon from "serve-favicon";
import serveStatic from "serve-static";
import { connectLogger } from "log4js";
import { systemLogger, accessLogger, errorLogger } from "./utils/log";
import passport from "passport";
import * as passportConfig from "./utils/passport";

import * as baseController from "./controller/base";
import * as userController from "./controller/user";

const APP_PORT = process.env.APP_PORT || 3000;
const APP_PUBLIC_PATH = process.env.APP_PUBLIC_PATH || "./public";
const API_BASE_V1 = process.env.API_BASE_V1 || "/api/v1";

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(connectLogger(accessLogger, {}));
app.use(favicon("./public/assets/img/favicon.ico"));
app.use(serveStatic(APP_PUBLIC_PATH));

app.use(
  session({
    secret: "secretpass",
    resave: false,
    saveUninitialized: false,
    // @Todo after TLS support secure
    cookie: { httpOnly: true, secure: false, maxAge: 60 * 60 * 1000 },
  })
);
app.use(csrf({ cookie: false, ignoreMethods: ["GET", "HEAD", "OPTIONS"] }));
app.use(passport.initialize());
app.use(passport.session());

app.set("APP_PORT", APP_PORT);
app.set("view engine", "pug");
app.set("views", "./views");
app.locals.basedir = app.get("views");

const routerBase: Router = express.Router();
const router: Router = express.Router();

routerBase.get("/", baseController.getIndex);
routerBase.get("/ping", baseController.getPing);
routerBase.get("/login", baseController.getLogin);
routerBase.post("/login", baseController.postLogin);
routerBase.get("/logout", baseController.getLogout);

router.get(
  API_BASE_V1 + "/users",
  passportConfig.isAuthenticated,
  userController.getUsers
);

// errors
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  errorLogger.error(err);
  res.status(500).send("Internal Server Error");
  next(err);
});

app.use(routerBase);
app.use(router);

export default app;
