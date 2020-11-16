import { config } from "dotenv";
config({ path: "../.env" });

import fs from "fs";
import path from "path";
import { errorLogger } from "../utils/log";

const KEY_PATH = "../keys";

if (!process.env.JWT_SECRET_KEY_FILENAME) {
  errorLogger.error("JWT key files load error: JWT_SECRET_KEY_FILENAME");
  throw new Error;
}
export const JWT_SECRET_KEY: Buffer = fs.readFileSync(
  path.resolve(__dirname, KEY_PATH, process.env.JWT_SECRET_KEY_FILENAME)
);

if (!process.env.JWT_PUBLIC_KEY_FILENAME) {
  errorLogger.error("JWT key files load error: JWT_PUBLIC_KEY_FILENAME");
  throw new Error;
}
export const JWT_PUBLIC_KEY: Buffer = fs.readFileSync(
  path.resolve(__dirname, KEY_PATH, process.env.JWT_PUBLIC_KEY_FILENAME)
);

if (!process.env.JWT_SECRET_PASS) {
  errorLogger.error("JWT key files load error: JWT_SECRET_PASS");
  throw new Error;
}
export const JWT_SECRET_PASS: string = process.env.JWT_SECRET_PASS;
