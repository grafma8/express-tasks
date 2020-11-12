import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { User } from "../domain/entity/User";
import { debugLogger } from "../utils/log";

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
  passport.authenticate("local", (err: Error, user: any, info: any) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect(req.session?.returnTo || "/");
    });
  })(req, res, next);
};

export const getLogout = (req: Request, res: Response): void => {
  req.logout();
  res.redirect("/");
};
