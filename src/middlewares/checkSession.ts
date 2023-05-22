import { handleHTTPError } from "../utils/error.handler";
import { verifyToken } from "../utils/jwt.handler";
import { NextFunction, Request, Response } from "express";

/**
 * Verifica si el usuario inició sesión
 * @param req Objeto de petición HTTP de express
 * @param res Objeto de respues HTTP de express
 * @param next Pasa al siguiente middleware
 */
function checkSession(req: Request, res: Response, next: NextFunction) {
  // Se separa porque el token llega con un token prefix de bearer
  const auth = req.headers.authorization?.split(" ")[1];
  const verified = verifyToken(auth as string);

  if (verified) {
    next();
  } else {
    handleHTTPError(res, 401, "USER NEEDS VERIFICATION");
  }
}

export { checkSession };
