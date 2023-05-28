import { Request, Response } from "express";
import {
  addProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../services/products";

import { Product } from "../interfaces/user.interface";
import { ProductUpdate } from "../interfaces/account.interface";
import { handleHTTPError } from "../utils/error.handler";

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
    handleHTTPError(res, 500, err);
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
    const data: Product = {
      name,
      purchase_price,
      sale_price,
      units,
    };
    const response = await addProduct(id as string, pass as string, data);
    res.status(200);
    res.send({ res: response });
  } catch (err) {
    handleHTTPError(res, 500, err);
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
    handleHTTPError(res, 500, err);
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
    const data: ProductUpdate = {
      _id,
      name,
      purchase_price,
      sale_price,
      units,
    };
    const response = await updateProduct(
      id as string,
      pass as string,
      _id as string,
      data
    );
    res.status(200);
    res.send({ res: response });
  } catch (err) {
    handleHTTPError(res, 500, err);
  }
}

export { productList, productAdd, productRemove, productUpdate };
