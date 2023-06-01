import { Request, Response } from "express";
import { UserLogin, UserRegister } from "../interfaces/auth.interface";
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
    const data: UserRegister = {
      firstname,
      lastname,
      email,
      password,
      company,
    };
    const response = await registerUser(data);
    res.status(200);
    res.json({ response });
  } catch (err) {
    handleHTTPError(res, err);
  }
}

/**
 * Verifica al usuario en la base de datos
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function signin({ body }: Request, res: Response) {
  try {
    const { email, password } = body;
    const data: UserLogin = {
      email,
      password,
    };
    const response = await loginUser(data);
    res.status(200);
    res.json({ response });
  } catch (err) {
    handleHTTPError(res, err);
  }
}

export { register, signin };
