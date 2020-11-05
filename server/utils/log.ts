import log4js from "log4js";

log4js.configure({
  appenders: {
    ConsoleLogAppender: {
      type: "console",
    },
    SystemLogAppender: {
      type: "file",
      filename: "./log/system.log",
      maxLogSize: 500000,
      backups: 3,
    },
    AccessLogAppender: {
      type: "dateFile",
      filename: "./log/access.log",
      pattern: ".yyyy-MM-dd",
      daysToKeep: 7,
    },
    ErrorLogAppender: {
      type: "dateFile",
      filename: "./log/error.log",
      pattern: ".yyyy-MM-dd",
      daysToKeep: 7,
    }
  },
  categories: {
    default: {
      appenders: ["ConsoleLogAppender"],
      level: "all",
    },
    system: {
      appenders: ["SystemLogAppender"],
      level: "info",
    },
    "system.dev": {
      appenders: ["ConsoleLogAppender"],
      level: "info"
    },
    access: {
      appenders: ["AccessLogAppender"],
      level: "info",
    },
    "access.dev": {
      appenders: ["ConsoleLogAppender"],
      level: "info"
    },
    error: {
      appenders: ["ErrorLogAppender"],
      level: "error",
    },
    "error.dev": {
      appenders: ["ConsoleLogAppender"],
      level: "error"
    },
  },
});

const isDev = process.env.NODE_ENV === "development"
export const logger = log4js.getLogger();
export const systemLogger = isDev ? log4js.getLogger("system.dev") : log4js.getLogger("system")
export const accessLogger = isDev ? log4js.getLogger("access.dev") : log4js.getLogger("access")
export const errorLogger = isDev ? log4js.getLogger("error.dev") : log4js.getLogger("error")
