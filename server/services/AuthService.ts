import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import { User } from "../domain/entity/User";
import {
  JWT_PUBLIC_KEY,
  JWT_SECRET_KEY,
  JWT_SECRET_PASS,
} from "../config/appConstants";
import { errorLogger } from "../utils/log";

export class AuthService {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  public static async compareHashAndPassword(
    passwd_str: string,
    passwd_hash: string
  ): Promise<boolean> {
    return bcrypt.compare(passwd_str, passwd_hash);
  }

  public static async getUserIdFromToken(
    token: string
  ): Promise<number | false> {
    const result = jwt.decode(token);
    if (result == null || typeof result == "string") return false;
    return result.user_id;
  }

  private async _generateToken(
    payload: any,
    signOptions?: jwt.SignOptions | undefined
  ): Promise<string> {
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      algorithm: "RS256",
      ...signOptions,
    });
    return token;
  }

  private async _verifyToken(
    token: string,
    verifyOptions?: jwt.VerifyOptions | undefined
  ): Promise<any | boolean> {
    let result;
    try {
      result = jwt.verify(token, JWT_PUBLIC_KEY, {
        algorithms: ["RS256"],
        ...verifyOptions,
      });
    } catch (err) {
      errorLogger.error(err, jwt.decode(token));
      return false;
    }
    return result;
  }

  async generateActivationJWTToken(): Promise<string> {
    let user_id = -1;
    if (this.user.user_id != null) user_id = this.user.user_id;
    return this._generateToken(
      { user_id: user_id },
      { expiresIn: "1d", subject: "user-activation" }
    );
  }

  async verifyActivationJWTToken(
    token: string,
    verifyOptions?: jwt.VerifyOptions
  ): Promise<any | boolean> {
    const result = await this._verifyToken(token, verifyOptions);
    if (this.user.user_id !== result.user_id) {
      errorLogger.error(
        `Sign verification user error: ${this.user.user_id} !== ${result.user_id}`
      );
      return false;
    }
    return result;
  }

}
