import { encrypt, verify } from "../utils/encrypt.handler";

import { UserModel } from "../models/user";
import { UserUpdate } from "../interfaces/account.interface";

/**
 * Obtiene la información de perfil del usuario desde la base de datos
 * @param id Identificador de usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @returns Los datos del usuario
 */
async function getUser(id: string, pass: string) {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error("USER NOT FOUND");
  }
  if (pass !== user.profile.password) {
    throw new Error("INCORRECT PASSWORD");
  }
  return user;
}

/**
 * Actualiza la información de perfil del usuario
 * @param id Identificador de usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @param param2 Objeto tipo UserRegister
 * @returns Los datos del usuario
 */
async function updateUser(
  id: string,
  pass: string,
  { firstname, lastname, company, email, password }: UserUpdate
) {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error("USER NOT FOUND");
  }
  if (pass !== user.profile.password) {
    throw new Error("INCORRECT PASSWORD");
  }

  if (firstname !== undefined && user.profile.firstname !== firstname) {
    user.profile.firstname = firstname;
  }

  if (lastname !== undefined && user.profile.lastname !== lastname) {
    user.profile.lastname = lastname;
  }

  if (lastname !== undefined && user.profile.lastname !== lastname) {
    user.profile.lastname = lastname;
  }

  if (company !== undefined && user.profile.company !== company) {
    user.profile.company = company;
  }

  if (company !== undefined && user.profile.company !== company) {
    user.profile.company = company;
  }

  if (password != undefined) {
    const verifyPassword = await verify(
      password as string,
      user.profile.password
    );
    if (!verifyPassword) {
      const hashPass = await encrypt(password as string);
      user.profile.password = hashPass;
    }
  }

  user.isNew = false;
  await user.save();

  return user.profile;
}

/**
 * Elimina el usuario
 * @param id Identificador de usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @returns Si fue exitosa la operación
 */
async function deleteUser(id: string, pass: string) {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error("USER NOT FOUND");
  }
  if (pass !== user.profile.password) {
    throw new Error("INCORRECT PASSWORD");
  }

  await user.deleteOne();

  return "USER SUCCESFULLY DELETED";
}

export { getUser, updateUser, deleteUser };
