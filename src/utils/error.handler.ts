import { ClientError } from "../config/error";
import { Response } from "express";

function handleHTTPError(res: Response, err: ClientError | any) {
  if (err instanceof ClientError) {
    res.status(err.statusCode).send({ msg: err.message, data: err.data });
  } else {
    res.status(400).send(err);
  }
}

export { handleHTTPError };
