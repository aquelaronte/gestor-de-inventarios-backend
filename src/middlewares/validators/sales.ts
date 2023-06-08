import { NextFunction, Request, Response } from "express";

import { ClientError } from "../../config/error";
import { handleHTTPError } from "../../utils/error.handler";

function saleIdValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const faultData: string[] = [];
    const { id_day, id_sale } = req.body;
    if (
      !id_day ||
      typeof id_day != "string" ||
      id_day.trim().length == 0 ||
      id_day.trim().length != id_day.length
    ) {
      faultData.push(`id_day`);
    }
    if (
      !id_sale ||
      typeof id_sale != "string" ||
      id_sale.trim().length == 0 ||
      id_sale.trim().length != id_sale.length
    ) {
      faultData.push(`id_sale`);
    }
    if (faultData.length >= 1) {
      throw new ClientError("INVALID USER'S SALE DATA", 400, faultData);
    }
    next();
  } catch (err: ClientError | unknown) {
    handleHTTPError(res, err);
  }
}

function saleAddValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const faultData: string[] = [];
    if (!Array.isArray(req.body)) {
      faultData.push("request is not an array");
    }
    for (let i = 0; i < req.body.length; i++) {
      const soldItem = req.body[i];
      if (
        !soldItem.product_id ||
        typeof soldItem.product_id != "string" ||
        soldItem.product_id.trim().length != soldItem.product_id.length ||
        soldItem.product_id.trim == 0
      ) {
        faultData.push(`name ${i}`);
      }
      if (
        !soldItem.units ||
        typeof soldItem.units != "number" ||
        soldItem.units <= 0
      ) {
        faultData.push(`units ${i}`);
      }
    }
    if (faultData.length >= 1) {
      throw new ClientError("INVALID USER'S SALE DATA", 400, faultData);
    }
    next();
  } catch (err: ClientError | unknown) {
    handleHTTPError(res, err);
  }
}

export { saleIdValidator, saleAddValidator };
