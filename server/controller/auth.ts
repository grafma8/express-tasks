import { Request, Response } from "express"

export const postLogin = (req: Request, res: Response): void => {
  res.status(200).send({});
}

export const postLogout = (req: Request, res: Response): void => {
  res.status(200).send({});
}