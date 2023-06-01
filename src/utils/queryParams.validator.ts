import { NextFunction, Request, Response } from "express";

import { header } from "express-validator";
import { validateResults } from "./validate.handler";

/**
 * Valida los headers del usuario en caso de que desee hacer CRUD
 */
const validateQueryParams = [
  header("id").exists().isString(),
  (req: Request, res: Response, next: NextFunction) =>
    validateResults(req, res, next),
];

export { validateQueryParams };
