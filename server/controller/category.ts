import { Request, Response } from "express"
export const getPing = (req: Request, res: Response): void => {
  res.status(200).send("pong");
};
