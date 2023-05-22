import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { validateResults } from "../utils/validate.handler";

/**
 * Valida los campos del body en caso de que el usuario desee registrarse
 */
const validateRegister = [
  body("firstname").exists().isString().trim().notEmpty(),
  body("lastname").exists().isString().trim().notEmpty(),
  body("company").exists().isString().trim().notEmpty(),
  body("email").exists().isString().trim().notEmpty().isEmail(),
  body("password")
    .exists()
    .isString()
    .notEmpty()
    .blacklist(" ")
    .isLength({ min: 8, max: 18 }),
  body("company").exists().isString().trim().notEmpty(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];

/**
 * Valida los campos del body en caso de que el usuario desee iniciar sesión
 */
const validateLogin = [
  body("email").exists().isString().trim().notEmpty().isEmail(),
  body("password")
    .exists()
    .isString()
    .notEmpty()
    .blacklist(" ")
    .isLength({ min: 8, max: 18 }),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];

export { validateRegister, validateLogin };
