import app from "./app";
import { systemLogger } from "./utils/log";
import { createConnection } from "typeorm";

createConnection("default").then((connection) => {
  const APP_PORT = process.env.APP_PORT || 3000;

  const server = app.listen(APP_PORT, () => {
    systemLogger.info(`Express server has started on port ${APP_PORT}`);
  });

  process.on("SIGTERM", () => {
    systemLogger.info("SIGTERM signal received: closing HTTP server");
    server.close(() => {
      systemLogger.info("HTTP server closed");
    });
  });
});
