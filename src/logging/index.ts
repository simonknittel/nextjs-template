import { env } from "../env";
import { logToConsole } from "./console";
import { type Json, type LogEntry } from "./types";

const getBaseLogEntry = () => ({
  timestamp: new Date().toISOString(),
  host: env.HOST,
  stack: new Error().stack,
  ...(env.COMMIT_SHA && { commitSha: env.COMMIT_SHA }),
});

const info = (message: string, args: Json = {}) => {
  const logEntry: LogEntry = {
    ...getBaseLogEntry(),
    level: "info",
    message,
    ...args,
  };

  logToConsole(logEntry);
};

const warn = (message: string, args: Json = {}) => {
  const logEntry: LogEntry = {
    ...getBaseLogEntry(),
    level: "warn",
    message,
    ...args,
  };

  logToConsole(logEntry);
};

const error = (message: string, args: Json = {}) => {
  const logEntry: LogEntry = {
    ...getBaseLogEntry(),
    level: "error",
    message,
    ...args,
  };

  logToConsole(logEntry);
};

export const log = {
  info,
  warn,
  error,
};
