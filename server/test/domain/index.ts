// import { config } from "dotenv";
// config({ path: "../.env" });

import "reflect-metadata";
import { createConnection, getCustomRepository } from "typeorm";
import { User } from "../../domain/entity/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import bcrypt from "bcrypt";
import { validate } from "class-validator";

createConnection()
  .then(async (connection) => {
    // console.log("Inserting a new user into the database...");
    // const userRepository = getCustomRepository(UserRepository);

    // const user = userRepository.create();
    // console.log("Debug user: ", user);
    // user.user_name = "Timberx";
    // user.email = "example@example.com";
    // const password = "unhashed";
    // user.password_hash = bcrypt.hashSync(password, 10);
    // user.type = 0;

    // const errors = await validate(user);
    // if (errors.length > 0) {
    //   throw new Error(`Validation failed!`);
    // } else {
    //   await userRepository.save(user);
    //   console.log("Saved a new user with id: " + user.user_id);
    // }

    // console.log("Loading users from the database...");
    // const selected_user = await userRepository.findByName("Timberx");
    // console.log("Loaded users: ", selected_user);

    // console.log(
    //   "Testing password: ",
    //   bcrypt.compareSync(password, user.password_hash)
    // );

    // console.log("Here you can setup and run express/koa/any other framework.");
  })
  .catch((error) => console.log(error));
