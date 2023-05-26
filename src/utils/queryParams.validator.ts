import { Request, Response, NextFunction } from "express";
import { header } from "express-validator";
import { validateResults } from "./validate.handler";

/**
 * Valida los headers del usuario en caso de que desee hacer CRUD
 */
const validateQueryParams = [
  header("id").exists().blacklist(" ").isString(),
  header("pass").exists(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];

export { validateQueryParams };
