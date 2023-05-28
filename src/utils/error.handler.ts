import { Response } from "express";

/**
 * Envía un error HTTP, establece un código HTTP igualmente
 * @param res Objeto respuesta para la librería express
 * @param code Código HTTP que se va a enviar al servidor
 * @param message Mensaje para mostrar al servidor
 */
function handleHTTPError(res: Response, code: number, message: unknown) {
  res.status(code);
  res.send({ err: message});
}

export { handleHTTPError };
