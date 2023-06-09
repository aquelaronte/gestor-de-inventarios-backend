import { encrypt, verify } from "../utils/encrypt.handler";

import { UserUpdate } from "../interfaces/account.interface";
import { userIdErrorHandler } from "../utils/userid.handler";

/**
 * Obtiene la información de perfil del usuario desde la base de datos
 * @param id Identificador de usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @returns Los datos del usuario
 */
async function getUser(id: string) {
  const user = await userIdErrorHandler(id);
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
  { firstname, lastname, company, email, password }: UserUpdate
) {
  const user = await userIdErrorHandler(id);

  if (firstname !== undefined && user.profile.firstname !== firstname) {
    firstname =
      firstname.charAt(0).toUpperCase() +
      firstname.slice(1).toLocaleLowerCase();

    user.profile.firstname = firstname;
  }

  if (lastname !== undefined && user.profile.lastname !== lastname) {
    lastname =
      lastname.charAt(0).toUpperCase() + lastname.slice(1).toLocaleLowerCase();
    user.profile.lastname = lastname;
  }

  if (email !== undefined && user.profile.email !== email) {
    user.profile.email = email;
  }

  if (company !== undefined && user.profile.company !== company) {
    company =
      company.charAt(0).toUpperCase() + company.slice(1).toLocaleLowerCase();
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
async function deleteUser(id: string) {
  const user = await userIdErrorHandler(id);

  await user.deleteOne();

  return "USER SUCCESFULLY DELETED";
}

export { getUser, updateUser, deleteUser };
