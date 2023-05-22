import { Request, Response, NextFunction } from "express";
import { body, header } from "express-validator";
import { validateResults } from "../utils/validate.handler";

/**
 * Valida los headers del usuario en caso de que desee hacer CRUD
 */
const validateQueryParams = [
  header("id").exists().blacklist(" ").isString(),
  header("pass").exists(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];

/**
 * Valida la información entregada por el usuario en caso de que desee hacer CRUD
 */
const validateUserInfo = [
  body("firstname").exists().isString().trim().notEmpty(),
  body("lastname").exists().isString().trim().notEmpty(),
  body("company").exists().isString().trim().notEmpty(),
  body("email").exists().isString().trim().notEmpty().isEmail(),
  body("password")
    .exists()
    .isString()
    .notEmpty()
    .blacklist(" ")
    .isLength({ min: 8, max: 16 }),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];

/**
 * Valida la información entregada por el usuario en caso de que desee hacer CRUD
 */
const validateProductInfo = [
  body("name").exists().isString().trim().notEmpty(),
  body("purchase_price").exists().isNumeric(),
  body("sale_price").exists().isNumeric(),
  body("units").exists().isNumeric(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];

export { validateQueryParams, validateUserInfo, validateProductInfo };
