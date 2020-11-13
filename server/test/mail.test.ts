import { config } from "dotenv";
config({ path: "../.env" });

import Mailer from "../utils/mail";

describe("Mail feature test", () => {
  const TEST_MAIL_TO = process.env.TEST_MAIL_TO;
  it("should send mail", async (done) => {
    if (TEST_MAIL_TO == null) throw new Error();
    Mailer.send(TEST_MAIL_TO, "test-mail", "Hello, world!");
    done();
  });
});
