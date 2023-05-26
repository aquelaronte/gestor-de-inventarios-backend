import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { validateResults } from "../utils/validate.handler";

const validateMakeSale = [
  body("sold_products").exists().isArray(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];

const validateDeleteSale = [
  body("id_day").exists().isString(),
  body("id_sale").exists().isString(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];

export { validateMakeSale, validateDeleteSale };
