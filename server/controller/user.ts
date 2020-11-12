import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../domain/entity/User";
import { classToPlain } from "class-transformer";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await getRepository(User).find();
  res.json(classToPlain(users));
};
