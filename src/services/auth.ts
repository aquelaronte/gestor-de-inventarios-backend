import { UserSignIn, UserSignUp } from "../interfaces/auth.interface";

import { ClientError } from "../config/error";
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
}: UserSignUp) {
  try {
    const hashPass = await encrypt(password as string);
    firstname =
      firstname.charAt(0).toUpperCase() +
      firstname.slice(1).toLocaleLowerCase();
    lastname =
      lastname.charAt(0).toUpperCase() + lastname.slice(1).toLocaleLowerCase();
    company =
      company.charAt(0).toUpperCase() + company.slice(1).toLocaleLowerCase();
    await UserModel.create({
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
    return "USER WAS SUCCESSFULLY REGISTERED";
  } catch (err) {
    throw new ClientError("USER IS ALREADY REGISTERED", 409);
  }
}

/**
 * Verifica el usuario en la base de datos
 * @param param0 OBjeto tipo UserSchema
 * @returns Un JWT
 */
async function loginUser({ email, password }: UserSignIn) {
  const user = await UserModel.findOne({ "profile.email": email });
  if (!user) {
    throw new ClientError("USER IS NOT REGISTERED", 404);
  }
  const verifyPass = await compare(password, user.profile.password);
  if (!verifyPass) {
    throw new ClientError("INCORRECT PASSWORD", 401);
  }
  const token = createToken(email as string);

  // El usuario se tiene que encargar de poner estos datos en los headers de sus sigueintes peticiones
  return {
    Authorization: token,
    id: user._id,
  };
}

export { registerUser, loginUser };
