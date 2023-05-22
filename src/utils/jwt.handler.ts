import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;

/**
 * Crea un token JWT
 * @param email Email del usuario
 * @returns un JWT
 */
function createToken(email: string) {
  const token = sign({ id: email }, SECRET as string);
  return token;
}

/**
 * Verifica el token entregado por el usuario
 * @param token El JWT del usuario
 * @returns Si la comparación es falsa o verdadera
 */
function verifyToken(token: string) {
  const tokenVerifyed = verify(token, SECRET as string);
  return tokenVerifyed;
}

export { createToken, verifyToken };
