import { hash, compare } from "bcryptjs";

/**
 * Encripta el string que se le pase por parámetro
 * @param password Contraseña ingresada por el usuario
 * @returns HashPassword
 */
async function encrypt(password: string) {
  const hashPassword = await hash(password, 8);
  return hashPassword;
}

/**
 * Verifica si la contraseña ingresada por el usuario es igual a la encriptada
 * @param password Contraseña ingresada por el usuario
 * @param hashPassword Contraseña de la base de datos
 * @returns Falso o verdadero, comparación
 */
async function verify(password: string, hashPassword: string) {
  const pass = await compare(password, hashPassword);
  return pass;
}

export { encrypt, verify };
