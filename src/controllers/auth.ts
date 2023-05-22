import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth";
import { handleHTTPError } from "../utils/error.handler";

/**
 * Envía al usuario si fue exitoso el registro
 * @param param0 JSON enviado al cuerpo de la petición
 * @param res Objeto de respuesta de express
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
 * Envia al usuario si fue exitoso el inicio de sesión
 * @param param0 JSON enviado al cuerpo de la petición
 * @param res Objeto de respuesta de express
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
