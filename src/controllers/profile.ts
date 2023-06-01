import { Request, Response } from "express";
import { deleteUser, getUser, updateUser } from "../services/profile";

import { UserUpdate } from "../interfaces/account.interface";
import { handleHTTPError } from "../utils/error.handler";

/**
 * Envia al usuario la información de su cuenta
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function userInfo({ headers }: Request, res: Response) {
  try {
    const { id } = headers;
    const response = await getUser(id as string);
    res.status(200);
    res.send(response);
  } catch (err) {
    handleHTTPError(res, err);
  }
}

/**
 * Actualiza la información de la cuenta del usuario
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function userUpdateInfo({ headers, body }: Request, res: Response) {
  try {
    const { id } = headers;
    const { firstname, lastname, company, email, password } = body;
    const data: UserUpdate = {
      firstname,
      lastname,
      company,
      email,
      password,
    };
    const response = await updateUser(id as string, data);
    res.status(200);
    res.send(response);
  } catch (err) {
    handleHTTPError(res, err);
  }
}

/**
 * Borra al usuario de la base de datos
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function userDelete({ headers }: Request, res: Response) {
  try {
    const { id } = headers;
    const response = await deleteUser(id as string);
    res.status(200);
    res.send(response);
  } catch (err) {
    handleHTTPError(res, err);
  }
}

export { userInfo, userUpdateInfo, userDelete };
