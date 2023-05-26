import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { validateResults } from "../utils/validate.handler";

/**
 * Valida la información entregada por el usuario en caso de que desee actualizar su perfil
 */
const validateUpdateUserInfo = [
  body("firstname").optional().isString().trim().notEmpty(),
  body("lastname").optional().isString().trim().notEmpty(),
  body("company").optional().isString().trim().notEmpty(),
  body("email").optional().isString().trim().notEmpty().isEmail(),
  body("password")
    .optional()
    .isString()
    .notEmpty()
    .blacklist(" ")
    .isLength({ min: 8, max: 16 }),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];

/**
 * Valida la información entregada por el usuario en caso de que desee añadir un producto
 */
const validateProductInfo = [
  body("name").exists().isString().trim().notEmpty(),
  body("purchase_price").exists().isNumeric(),
  body("sale_price").exists().isNumeric(),
  body("units").exists().isNumeric(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];

/**
 * Valida la información entregada por el usuario en caso de que se desee actualizar un producto
 */
const validateUpdateProductInfo = [
  body("name").isString().trim().notEmpty().optional(),
  body("purchase_price").isNumeric().optional(),
  body("sale_price").isNumeric().optional(),
  body("units").isNumeric().optional(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];

export {
  validateProductInfo,
  validateUpdateProductInfo,
  validateUpdateUserInfo,
};
