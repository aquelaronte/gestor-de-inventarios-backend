import { ClientError } from "../config/error";
import { Response } from "express";

function handleHTTPError(res: Response, err: ClientError | any) {
  if (err instanceof ClientError) {
    res.status(err.statusCode).send(err.message);
  } else {
    res.status(500).send(err);
  }
}

export { handleHTTPError };
