export interface LogEntry {
  /** ISO string of the date (e.g. `new Date().toISOString()`) */
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
  host: string;
  commitSha?: string;
  [key: string]: string | number | boolean | undefined;
}

export type LogOutput = (logEntry: LogEntry) => void;

/**
 * `Date` is explicitly excluded from the type to promote the use of `new
 * Date().toISOString()` instead of relying on the built-in serialization
 * of Date objects
 */
type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined // No valid JSON type, but will get removed (in objects) or serialized to null (in arrays) by `JSON.stringify()`
  | { [key: string]: JsonValue }
  | JsonValue[];

export type Json = Record<string, JsonValue>;
