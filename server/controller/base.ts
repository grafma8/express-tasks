import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { User } from "../domain/entity/User";
import { debugLogger, errorLogger } from "../utils/log";
import { body, validationResult } from "express-validator";

export const getIndex = async (req: Request, res: Response): Promise<void> => {
  res.render("index", { csrfToken: req.csrfToken() });
};

export const getPing = async (req: Request, res: Response): Promise<void> => {
  res.status(200).send("pong");
};

// @TODO 全てapiに
export const getLogin = async (req: Request, res: Response): Promise<void> => {
  if (req.user) return res.redirect("/");
  res.render("login", { csrfToken: req.csrfToken() });
};

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await body("email", "Email is not valid").isEmail().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array())
    errorLogger.error(errors.array());
  }

  passport.authenticate("local", (err: Error, user: any, info: any) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect(req.session?.returnTo || "/");
      // res.redirect("/");
    });
  })(req, res, next);
};

export const getLogout = (req: Request, res: Response): void => {
  req.logout();
  res.redirect("/");
};
