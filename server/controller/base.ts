import { Request, Response } from "express";

export const getIndex = (req: Request, res: Response): void => {
  res.render("index", { csrfToken: req.csrfToken() });
};

export const getPing = (req: Request, res: Response): void => {
  res.status(200).send("pong");
};
