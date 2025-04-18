import { PrismaClientKnownRequestError } from "@/db";
import { Logger } from "@nextjs-template/logging";
import { unstable_rethrow } from "next/navigation";
import { serializeError } from "serialize-error";
import { ZodError } from "zod";

export interface ServerActionResponse {
  readonly status: number;
  readonly error?: unknown;
  readonly errorMessage?: string;
}

export type ServerAction = (
  formData: FormData,
  options?: {
    successAction?: "redirectToOverView" | "redirectToDetails";
  },
) => Promise<ServerActionResponse>;

export const serverActionErrorHandler = (
  error: unknown,
  options?: {
    errorMessages?: {
      400?: string;
      401?: string;
      403?: string;
      404?: string;
      409?: string;
      500?: string;
    };
  },
): ServerActionResponse => {
  unstable_rethrow(error);

  if (
    error instanceof ZodError ||
    (error instanceof Error &&
      ["Bad Request", "Unexpected end of JSON input"].includes(error.message))
  ) {
    Logger.warn("Bad Request", {
      error: serializeError(error),
    });
    return {
      status: 400,
      errorMessage:
        options?.errorMessages?.[400] ??
        "Bad Request. Please check your inputs.",
      error: JSON.stringify(error),
    };
  } else if (error instanceof Error && error.message === "Unauthorized") {
    Logger.warn("Unauthorized", {
      error: serializeError(error),
    });
    return {
      status: 401,
      errorMessage:
        options?.errorMessages?.[401] ?? "You have to be signed in to do this.",
    };
  } else if (error instanceof Error && error.message === "Forbidden") {
    Logger.warn("Forbidden", {
      error: serializeError(error),
    });
    return {
      status: 403,
      errorMessage:
        options?.errorMessages?.[403] ??
        "You don't have the required permissions to do this.",
    };
  } else if (
    (error instanceof Error && error.message === "Not Found") ||
    (error instanceof PrismaClientKnownRequestError &&
      error.code === "P2001") ||
    (error instanceof PrismaClientKnownRequestError &&
      error.code === "P2015") ||
    (error instanceof PrismaClientKnownRequestError && error.code === "P2025")
  ) {
    Logger.warn("Not Found", {
      error: serializeError(error),
    });
    return {
      status: 404,
      errorMessage:
        options?.errorMessages?.[404] ??
        "Not found. Something you requested couldn't be found.",
    };
  } else if (
    (error instanceof Error && error.message === "Duplicate") ||
    (error instanceof PrismaClientKnownRequestError && error.code === "P2002")
  ) {
    Logger.warn("Duplicate", {
      error: serializeError(error),
    });
    return {
      status: 409,
      errorMessage:
        options?.errorMessages?.[409] ??
        "Conflict. Please reload the page and try again.",
    };
  }

  Logger.error("errorHandler", {
    error: serializeError(error),
  });

  return {
    status: 500,
    errorMessage:
      options?.errorMessages?.[500] ??
      "An unknown error occurred. Please try again later.",
  };
};
