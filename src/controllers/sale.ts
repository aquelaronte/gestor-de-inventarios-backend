import { Request, Response } from "express";
import { handleHTTPError } from "../utils/error.handler";
import { addSale, getSales, removeSale } from "../services/sale";

/**
 * Envia al usuario si fue exitosa la operación de obtener las ventas de su perfil, para obtenerlas, el usuario requiere:
 *  - Un JWT en su header de authorization (Bearer ....)
 *  - Un ID en su header (id)
 *  - Un password en su header (pass)
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTPP de express
 */
async function getProductSales({ headers }: Request, res: Response) {
  try {
    const { id, pass } = headers;
    const response = await getSales(id as string, pass as string);
    res.status(200);
    res.send({ res: response });
  } catch (err) {
    handleHTTPError(res, 500, "INTERNAL SERVER ERROR: \n" + err);
  }
}

/**
 * Envia al usuario si fue exitosa la operación de añadir una venta a su perfil, para hacerlo, el usuario requiere:
 *  - Un JWT en su header de authorization (Bearer ....)
 *  - Un ID en su header (id)
 *  - Un password en su header (pass)
 *  - Un objeto JSON en el body de su petición HTTP con todos los datos requeridos
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTPP de express
 */
async function makeSale({ body, headers }: Request, res: Response) {
  try {
    const { id, pass } = headers;
    const { sold_products } = body;
    const response = await addSale(id as string, pass as string, sold_products);
    res.status(200);
    res.send({ res: response });
  } catch (err) {
    handleHTTPError(res, 500, "INTERNAL SERVER ERROR: \n" + err);
  }
}

/**
 * Envia al usuario si fue exitosa la operación de borrar una venta de su perfil, para hacerlo, el usuario requiere:
 *  - Un JWT en su header de authorization (Bearer ....)
 *  - Un ID en su header (id)
 *  - Un password en su header (pass)
 *  - Un objeto JSON en el body de su petición HTTP con todos los datos requeridos
 * @param param0 Objeto de petición HTTP de express
 * @param res Objeto de respuesta HTPP de express
 */
async function deleteSale({ body, headers }: Request, res: Response) {
  try {
    const { id, pass } = headers;
    const { id_day, id_sale } = body;
    const response = await removeSale(
      id as string,
      pass as string,
      id_day as string,
      id_sale as string
    );
    res.status(200);
    res.send({ res: response });
  } catch (err) {
    handleHTTPError(res, 500, "INTERNAL SERVER ERROR: \n" + err);
  }
}

export { getProductSales, makeSale, deleteSale };
