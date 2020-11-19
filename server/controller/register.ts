import { NextFunction, Request, Response } from "express";
// import passport from "passport";
import { User } from "../domain/entity/User";
import { debugLogger, errorLogger } from "../utils/log";
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";

/**
 * route GET /register
 */
export const getRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("register/index", { csrfToken: req.csrfToken() });
};

/**
 * @route POST /register
 */
export const postRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_name = req.body.user_name;
  const email = req.body.email;
  const password = req.body.password;
  // @todo input validation
  const userService = new UserService();
  const user = userService.createUser(user_name, email, password);
  if (!user) {
    errorLogger.error("user registration failed.");
    res.redirect("/register");
  }
  // @todo send mail verification
  res.redirect("/register/mail_start_complete");
};

/**
* @route GET /register/mail_start_complete
*/
export const getRegisterMailStartComplete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("register/mail_start_complete");
};

/**
* @route GET /register/start/:token
*/
export const getRegisterStart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.params.token;
  if (!token) {
    res.redirect("/register");
  }

  const userService = new UserService();
  const result = await userService.checkJWTTokenAndActivate(token);
  if (!result) {
    res.redirect("/register");
  }
  res.redirect("/register/complete");
};

/**
* @route GET /register/complete
*/
export const getRegisterComplete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("register/complete");
};
