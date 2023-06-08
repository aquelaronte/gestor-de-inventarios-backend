import { NextFunction, Request, Response } from "express";

import { ClientError } from "../../config/error";
import { handleHTTPError } from "../../utils/error.handler";

function idValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.headers;
    const faultData: string[] = [];
    if (
      !id ||
      typeof id != "string" ||
      id.trim().length == 0 ||
      id.trim().length != id.length
    ) {
      faultData.push("id");
    }
    if (faultData.length >= 1) {
      throw new ClientError("INVALID USER'S PROVIDED DATA", 400, faultData);
    }
    next();
  } catch (err: ClientError | unknown) {
    handleHTTPError(res, err);
  }
}

export { idValidator };
