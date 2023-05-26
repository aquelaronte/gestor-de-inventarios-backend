import { Request, Response } from "express";
import { handleHTTPError } from "../utils/error.handler";
import {
  addProduct,
  deleteUser,
  getProducts,
  getUser,
  removeProduct,
  updateProduct,
  updateUser,
} from "../services/account";
import { UserUpdate } from "../interfaces/account.interface";

/**
 * Envia al usuario la información de su cuenta
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function userInfo({ headers }: Request, res: Response) {
  try {
    const { id, pass } = headers;
    const response = await getUser(id as string, pass as string);
    res.status(200);
    res.send({ res: response });
  } catch (err) {
    handleHTTPError(res, 500, "INTERNAL SERVER ERROR: \n" + err);
  }
}

/**
 * Actualiza la información de la cuenta del usuario
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function userUpdateInfo({ headers, body }: Request, res: Response) {
  try {
    const { id, pass } = headers;
    const { firstname, lastname, company, email, password } = body;
    const data: UserUpdate = {
      firstname,
      lastname,
      company,
      email,
      password,
    };
    const response = await updateUser(id as string, pass as string, data);
    res.status(200);
    res.send({ res: response });
  } catch (err) {
    handleHTTPError(res, 500, "INTERNALL SERVER ERROR: \n" + err);
  }
}

/**
 * Borra al usuario de la base de datos
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function userDelete({ headers }: Request, res: Response) {
  try {
    const { id, pass } = headers;
    const response = await deleteUser(id as string, pass as string);
    res.status(200);
    res.send({ res: response });
  } catch (err) {
    handleHTTPError(res, 500, "INTERNAL SERVER ERROR: \n" + err);
  }
}

/**
 * Envia al usuario la información de sus productos
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function productList({ headers }: Request, res: Response) {
  try {
    const { id, pass } = headers;
    const response = await getProducts(id as string, pass as string);
    res.status(200);
    res.send({ res: response });
  } catch (err) {
    handleHTTPError(res, 500, "INTERNAL SERVER ERROR: \n" + err);
  }
}

/**
 * Añade un producto al perfil del usuario
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function productAdd({ headers, body }: Request, res: Response) {
  try {
    const { id, pass } = headers;
    const { name, purchase_price, sale_price, units } = body;
    const response = await addProduct(id as string, pass as string, {
      name,
      purchase_price,
      sale_price,
      units,
    });
    res.status(200);
    res.send({ res: response });
  } catch (err) {
    handleHTTPError(res, 500, "INTERNAL SERVER ERROR: \n" + err);
  }
}

/**
 * Borra un producto de la base de datos
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function productRemove({ headers, body }: Request, res: Response) {
  try {
    const { id, pass } = headers;
    const { _id } = body;
    const response = await removeProduct(
      id as string,
      pass as string,
      _id as string
    );
    res.status(200);
    res.send({ res: response });
  } catch (err) {
    handleHTTPError(res, 500, "INTERNAL SERVER ERROR: \n" + err);
  }
}

/**
 * Actualiza un producto de la base de datos
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function productUpdate({ headers, body }: Request, res: Response) {
  try {
    const { id, pass } = headers;
    const { _id, name, purchase_price, sale_price, units } = body;
    const response = await updateProduct(
      id as string,
      pass as string,
      _id as string,
      { name, purchase_price, sale_price, units }
    );
    res.status(200);
    res.send({ res: response });
  } catch (err) {
    handleHTTPError(res, 500, "INTERNAL SERVER ERROR: \n" + err);
  }
}

export { userInfo, userUpdateInfo, userDelete };
export { productList, productAdd, productRemove, productUpdate };
