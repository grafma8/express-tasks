import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../domain/entity/User";
import { errorLogger, debugLogger } from "./log";
import { getRepository, getCustomRepository } from "typeorm";
import { UserRepository } from "../domain/repository/UserRepository";
import { Request, Response, NextFunction } from "express";
import { classToPlain, plainToClass } from "class-transformer";

passport.serializeUser<any, any>((user: User, done) => {
  debugLogger.debug("serializing user: ", user);
  done(null, user);
});

passport.deserializeUser<any, any>(async (user: User, done) => {
  try {
    debugLogger.debug("deserialize user: ", plainToClass(User, user));
    done(null, plainToClass(User, user));
  } catch (err) {
    errorLogger.error(err);
    done(err);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: true },
    async (email, password, done) => {
      try {
        const user = await getCustomRepository(UserRepository).findByEmail(
          email
        );
        if (!user) return done(null, false, { message: "Incorrect email" });
        const isValidPassword = await User.comparePassword(
          password,
          user!.password
        );
        if (!isValidPassword) {
          done(null, false, { message: "Incorrect password" });
        }
        // @TODO check property to be safe
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.isAuthenticated()) {
    debugLogger.debug("Already logined.");
    return next();
  }
  debugLogger.debug("Not logined");
  res.redirect("/login");
};
