import { UserLogin, UserRegister } from "../interfaces/auth.interface";

import { UserModel } from "../models/user";
import { compare } from "bcryptjs";
import { createToken } from "../utils/jwt.handler";
import { encrypt } from "../utils/encrypt.handler";

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
}: UserRegister) {
  const verifyUser = await UserModel.findOne({ email });
  if (verifyUser) {
    return "USER IS ALREADY REGISTERED";
  }
  const hashPass = await encrypt(password as string);
  const newUser = await UserModel.create({
    profile: {
      firstname,
      lastname,
      email,
      password: hashPass,
      company,
    },
    products: [],
    sales: [],
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
async function loginUser({ email, password }: UserLogin) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return "USER IS NOT REGISTERED";
  }
  const verifyPass = await compare(
    password as string,
    user.profile.password as string
  );
  if (!verifyPass) {
    return "INCORRECT PASSWORD";
  }

  const token = createToken(email as string);

  // El usuario se tiene que encargar de poner estos datos en los headers de sus sigueintes peticiones
  return {
    auth: token,
    id: user._id,
    pass: user.profile.password,
  };
}

export { registerUser, loginUser };
