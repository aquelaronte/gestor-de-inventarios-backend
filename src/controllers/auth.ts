import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth";
import { handleHTTPError } from "../utils/error.handler";

/**
 * Registra al usuario en la base de dats
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function register({ body }: Request, res: Response) {
  try {
    const { firstname, lastname, email, password, company } = body;
    const response = await registerUser({
      firstname,
      lastname,
      email,
      password,
      company,
    });
    res.status(200);
    res.send(response);
  } catch (err) {
    handleHTTPError(res, 500, "INTERNAL SERVER ERROR: \n" + err);
  }
}

/**
 * Verifica al usuario en la base de datos
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function login({ body }: Request, res: Response) {
  try {
    const { email, password } = body;
    const response = await loginUser({ email, password });
    res.status(200);
    res.send(response);
  } catch (err) {
    handleHTTPError(res, 500, "INTERNAL SERVER ERROR: \n " + err);
  }
}

export { register, login };
