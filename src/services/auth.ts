import { compare } from "bcryptjs";
import { UserModel } from "../models/user";
import { encrypt } from "../utils/encrypt.handler";
import { createToken } from "../utils/jwt.handler";
import { UserSchema } from "../interfaces/user.interface";

/**
 * Registra un usuario a la base de datos
 * @param param0 Objeto tipo UserSchema
 * @returns Si fue exitoso el registro de usuario
 */
async function registerUser({
  firstname,
  lastname,
  email,
  password,
  company,
}: UserSchema) {
  const verifyUser = await UserModel.findOne({ email });
  if (verifyUser) {
    return "USER IS ALREADY REGISTERED";
  }
  const hashPass = await encrypt(password as string);
  const newUser = await UserModel.create({
    firstname,
    lastname,
    email,
    password: hashPass,
    company,
  });
  if (newUser) {
    return "USER WAS SUCCESSFULLY REGISTERED";
  }
}

/**
 * Verifica el usuario en la base de datos
 * @param param0 OBjeto tipo UserSchema
 * @returns Un JWT
 */
async function loginUser({ email, password }: UserSchema) {
  const verifyUser = await UserModel.findOne({ email });
  if (!verifyUser) {
    return "USER IS NOT REGISTERED";
  }
  const verifyPass = await compare(
    password as string,
    verifyUser.password as string
  );
  if (!verifyPass) {
    return "INCORRECT PASSWORD";
  }

  const token = createToken(email as string);

  // El usuario se tiene que encargar de poner estos datos en los headers de sus sigueintes peticiones
  return {
    auth: token,
    id: verifyUser._id,
    pass: verifyUser.password,
  };
}

export { registerUser, loginUser };
