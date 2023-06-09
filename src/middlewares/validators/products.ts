import { NextFunction, Request, Response } from "express";

import { ClientError } from "../../config/error";
import { handleHTTPError } from "../../utils/error.handler";
import { capitalizeString } from "../../utils/capitalize.util";

function addProductsValidator(
  { body }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const faultData: string[] = [];
    if (!Array.isArray(body)) {
      faultData.push("request is not an array");
    }
    for (let i = 0; i < body.length; i++) {
      const product = body[i];
      if (
        !product.name ||
        typeof product.name != "string" ||
        product.name.trim().length == 0
      ) {
        faultData.push(`name ${i}`);
      }
      if (
        !product.purchase_price ||
        typeof product.purchase_price != "number" ||
        product.purchase_price <= 0
      ) {
        faultData.push(`purchase_price ${i}`);
      }
      if (
        !product.sale_price ||
        typeof product.sale_price != "number" ||
        product.sale_price <= 0
      ) {
        faultData.push(`sale_price ${i}`);
      }
      if (
        !product.units ||
        typeof product.units != "number" ||
        product.sale_price <= 0
      ) {
        faultData.push(`units ${i}`);
      }
      body[i].name = capitalizeString(product.name);
    }
    if (faultData.length >= 1) {
      throw new ClientError("INVALID USER'S PRODUCT DATA", 400, faultData);
    }
    next();
  } catch (err: ClientError | unknown) {
    handleHTTPError(res, err);
  }
}

function productIdValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const faultData: string[] = [];
    const { _id } = req.body;
    if (
      !_id ||
      typeof _id != "string" ||
      _id.trim().length == 0 ||
      _id.trim().length != _id.length
    ) {
      faultData.push("product id");
    }
    if (faultData.length >= 1) {
      throw new ClientError("INVALID USER'S PRODUCT DATA", 400, faultData);
    }
    next();
  } catch (err: ClientError | unknown) {
    handleHTTPError(res, err);
  }
}

function productUpdateValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const faultData: string[] = [];
    let { name, purchase_price, sale_price, units } = req.body;
    if (
      name == undefined &&
      purchase_price == undefined &&
      sale_price == undefined &&
      units == undefined
    ) {
      faultData.push("data");
    }
    if (
      name != undefined &&
      (typeof name != "string" || name.trim().length <= 0)
    ) {
      faultData.push(`name`);
    } else if (name) {
      name = capitalizeString(name);
    }
    if (
      purchase_price != undefined &&
      (typeof purchase_price != "number" || purchase_price <= 0)
    ) {
      faultData.push(`purchase_price`);
    }
    if (
      sale_price != undefined &&
      (typeof sale_price != "number" || sale_price <= 0)
    ) {
      faultData.push(`sale_price`);
    }
    if (units != undefined && (typeof units != "number" || units <= 0)) {
      faultData.push(`units`);
    }
    if (faultData.length >= 1) {
      throw new ClientError("INVALID USER'S PRODUCT DATA", 400, faultData);
    }
    next();
  } catch (err: ClientError | unknown) {
    handleHTTPError(res, err);
  }
}

export { addProductsValidator, productIdValidator, productUpdateValidator };
