import { NextFunction, Request, Response } from "express";

import { verifyToken } from "../utils/jwt.handler";
import { handleHTTPError } from "../utils/error.handler";

/**
 * Verifica si el usuario inició sesión
 * @param req Objeto de petición HTTP de express
 * @param res Objeto de respues HTTP de express
 * @param next Pasa al siguiente middleware
 */
function checkSession(req: Request, res: Response, next: NextFunction) {
  try {
    // Se separa porque el token llega con un token prefix de bearer
    const auth = req.headers.authorization?.split(" ")[1];
    verifyToken(auth as string);
    next();
  } catch {
    handleHTTPError(res, 401);
  }
}

export { checkSession };
