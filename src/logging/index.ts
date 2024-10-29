import { env } from "@/env";
import { logToConsole } from "./console";
import { type Json, type LogEntry } from "./types";

export class Logger {
  static info(message: string, args: Json = {}) {
    const logEntry: LogEntry = {
      ...this.getBaseLogEntry(),
      level: "info",
      message,
      ...args,
    };

    logToConsole(logEntry);
  }

  static warn(message: string, args: Json = {}) {
    const logEntry: LogEntry = {
      ...this.getBaseLogEntry(),
      level: "warn",
      message,
      ...args,
    };

    logToConsole(logEntry);
  }

  static error(message: string, args: Json = {}) {
    const logEntry: LogEntry = {
      ...this.getBaseLogEntry(),
      level: "error",
      message,
      ...args,
    };

    logToConsole(logEntry);
  }

  private static getBaseLogEntry() {
    return {
      timestamp: new Date().toISOString(),
      host: env.HOST,
      stack: new Error().stack,
      ...(env.COMMIT_SHA && { commitSha: env.COMMIT_SHA }),
    };
  }
}
