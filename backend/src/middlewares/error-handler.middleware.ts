import { ErrorRequestHandler } from "express";
import { HttpException } from "../exceptions/http.exception";

function getStatusCode(err: HttpException | Error): number {
  return "status" in err ? err.status : 500;
}

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  res
    .status(getStatusCode(err)).
    json({ error: err.message });
  next();
};
