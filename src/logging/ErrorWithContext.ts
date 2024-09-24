import type { Json } from "./types";

type Context = Json;

export class ErrorWithContext extends Error {
  context: Context;

  constructor(message: string, context: Context = {}) {
    super(message);

    this.name = "CustomError";
    this.context = context;
  }
}
