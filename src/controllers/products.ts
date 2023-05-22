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
} from "../services/product";

/**
 * Envia al usuario la información de su perfil, para obtenerlo, el usuario requiere:
 *  - Un JWT en su header de authorization (Bearer ....)
 *  - Un ID en su header (id)
 *  - Un password en su header (pass)
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTPP de express
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
 * Envia al usuario si fue exitosa la actualización de su perfil, para obtenerlo, el usuario requiere:
 *  - Un JWT en su header de authorization (Bearer ....)
 *  - Un ID en su header (id)
 *  - Un password en su header (pass)
 *  - Un objeto JSON en el body de su petición HTTP con todos los datos y el que quira actualizar
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTPP de express
 */
async function userUpdateInfo({ headers, body }: Request, res: Response) {
  try {
    const { id, pass } = headers;
    const { firstname, lastname, company, email, password } = body;
    const response = await updateUser(id as string, pass as string, {
      firstname,
      lastname,
      company,
      email,
      password,
    });
    res.status(200);
    res.send({ res: response });
  } catch (err) {
    handleHTTPError(res, 500, "INTERNALL SERVER ERROR: \n" + err);
  }
}

/**
 * Envia al usuario si fue exitosa la operación de borrar su perfil, para obtenerlo, el usuario requiere:
 *  - Un JWT en su header de authorization (Bearer ....)
 *  - Un ID en su header (id)
 *  - Un password en su header (pass)
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTPP de express
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
 * Envia al usuario si fue exitosa la operación de obtener los productos de su perfil, para obtenerlo, el usuario requiere:
 *  - Un JWT en su header de authorization (Bearer ....)
 *  - Un ID en su header (id)
 *  - Un password en su header (pass)
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTPP de express
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
 * Envia al usuario si fue exitosa la operación de obtener los productos de su perfil, para obtenerlo, el usuario requiere:
 *  - Un JWT en su header de authorization (Bearer ....)
 *  - Un ID en su header (id)
 *  - Un password en su header (pass)
 *  - Un objeto JSON en el body de su petición HTTP con todos los datos requeridos
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTPP de express
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
 * Envia al usuario si fue exitosa la operación de borrar un producto de su perfil, para obtenerlo, el usuario requiere:
 *  - Un JWT en su header de authorization (Bearer ....)
 *  - Un ID en su header (id)
 *  - Un password en su header (pass)
 *  - Un objeto JSON en el body de su petición HTTP con todos los datos requeridos
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTPP de express
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
 * Envia al usuario si fue exitosa la operación de actualizar un producto de su perfil, para hacerlo, el usuario requiere:
 *  - Un JWT en su header de authorization (Bearer ....)
 *  - Un ID en su header (id)
 *  - Un password en su header (pass)
 *  - Un objeto JSON en el body de su petición HTTP con todos los datos requeridos
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTPP de express
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
