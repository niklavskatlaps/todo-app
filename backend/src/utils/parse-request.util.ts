import { Request } from "express";
import  { z, AnyZodObject } from "zod";
import { HttpException } from "../exceptions/http.exception";

export function parseRequest<T extends AnyZodObject>(
  schema: T,
  req: Request
): z.infer<T> {
  try {
    return schema.parse(req);
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : JSON.stringify(error);

    throw new HttpException(message, 400);
  }
}
