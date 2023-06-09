import { Request, Response } from "express";
import { addSale, getSales, removeSale } from "../services/sales";

import { handleHTTPError } from "../utils/error.handler";

/**
 * Obtiene las ventas totales del usuario
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function getProductSales({ headers }: Request, res: Response) {
  try {
    const { id } = headers;
    const response = await getSales(id as string);
    res.status(200);
    res.json({ response });
  } catch (err) {
    handleHTTPError(res, err);
  }
}

/**
 * Registra una venta en el perfil del usuario
 * @param param0 Objeto d petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function makeSale({ body, headers }: Request, res: Response) {
  try {
    const { id } = headers;
    const response = await addSale(id as string, body);
    res.status(200);
    res.json({ response });
  } catch (err) {
    handleHTTPError(res, err);
  }
}

/**
 * Borra una venta del perfil del usuario
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTTP de express
 */
async function deleteSale({ body, headers }: Request, res: Response) {
  try {
    const { id } = headers;
    const { id_day, id_sale } = body;
    const response = await removeSale(
      id as string,
      id_day as string,
      id_sale as string
    );
    res.status(200);
    res.json({ response });
  } catch (err) {
    handleHTTPError(res, err);
  }
}

export { getProductSales, makeSale, deleteSale };
