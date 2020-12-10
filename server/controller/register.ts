import { NextFunction, Request, Response } from "express";
// import passport from "passport";
import { User } from "../domain/entity/User";
import { debugLogger, errorLogger } from "../utils/log";
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";
import { body, validationResult } from "express-validator";
import { Mailer } from "../utils/mail";

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
  await body("user_name", "Username is not valid").notEmpty().run(req);
  await body("user_name", "Username length is not valid")
    .isLength({ min: 3 })
    .run(req);
  await body("email", "Email is not valid")
    .notEmpty()
    .isEmail()
    .custom(async (value) => {
      const userService = new UserService();
      const isEmailExists = await userService.isEmailExists(value);
      if (isEmailExists) throw new Error("Already registered email");
      return true;
    })
    .run(req);
  await body("password", "Password is not valid")
    .notEmpty()
    .isLength({ min: 6 })
    .run(req);
  await body("password_confirm", "Password confirm is not valid")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Password confirmation does not match password");
      return true;
    })
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    errorLogger.error(errors.array());
    return res.redirect("/register");
  }

  const userName = req.body.user_name;
  const email = req.body.email;
  const password = req.body.password;
  const userService = new UserService();
  const user = await userService.create({
    user_name: userName,
    email: email,
    password: password,
  });
  if (!user) {
    errorLogger.error("user registration failed.");
    return res.redirect("/register");
  }

  const authService = new AuthService(user);
  const token = await authService.generateActivationJWTToken();
  Mailer.sendEmailVerificationMail(email, userName, token);
  res.redirect("/register/mail_complete");
};

/**
 * @route GET /register/mail_complete
 */
export const getRegisterMailComplete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("register/mail_complete");
};

/**
 * @route GET /register/start/:token
 */
export const getRegisterStart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.query.token;
  if (typeof token !== "string") {
    return res.redirect("/register");
  }

  const userService = new UserService();
  const result = await userService.checkJWTTokenAndActivate(token);
  if (!result) {
    return res.redirect("/register");
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
