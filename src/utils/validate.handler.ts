import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { handleHTTPError } from "./error.handler";

/**
 * Maneja los errores automáticamente
 * @param req Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 * @param next Next desde express
 * @returns Retorna la funcion next en caso de que no haya errores, de lo contrario, retornará una respuesta HTTP con el primer error registrado
 */
function validateResults(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    validationResult(req).throw();
    return next();
  } catch (err: any) {
    handleHTTPError(res, 403, { errors: err.array() });
  }
}

export { validateResults };
