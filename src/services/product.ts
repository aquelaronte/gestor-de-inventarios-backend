import { Product, UserSchema } from "../interfaces/user.interface";
import { UserModel } from "../models/user";
import { encrypt, verify } from "../utils/encrypt.handler";

/**
 * Obtiene la información de perfil del usuario desde la base de datos
 * @param id Identificador de usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @returns Si fue exitosa la operación del usuario
 */
async function getUser(id: string, pass: string) {
  const user = await UserModel.findById(id);
  if (!user) {
    return "USER NOT FOUND";
  }
  if (pass !== user.password) {
    return "INCORRECT PASSWORD";
  }
  return user;
}

/**
 * Actualiza la información de perfil del usuario
 * @param id Identificador de usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @param param2 Objeto tipo UserSchema
 * @returns Si fue exitosa la operación del usuario
 */
async function updateUser(
  id: string,
  pass: string,
  { firstname, lastname, company, email, password }: UserSchema
) {
  const user = await UserModel.findById(id);
  if (!user) {
    return "USER NOT FOUND";
  }
  if (pass !== user.password) {
    return "INCORRECT PASSWORD";
  }
  // Actualiza solo los valores que no incluyan products y total_sales
  user.firstname = firstname;
  user.lastname = lastname;
  user.company = company;
  user.email = email;

  // Verifica si la contraseña entregada por el usuario es diferente a la que esta en la base de datos
  // Si no es igual entonces se encripta la que paso el usuario, de lo contrario, no se actualiza
  const verifyPassword = await verify(password as string, user.password);

  if (!verifyPassword) {
    const hashPass = await encrypt(password as string);
    user.password = hashPass;
  }

  // Isnew: Dice a la base de usuarios si crear un nuevo registro de Usuario o solo actualizar el obtenido
  user.isNew = false;
  await user.save();

  return "USER SUCCESFULLY UPDATED";
}

/**
 *
 * @param id Identificador de usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @returns
 */
async function deleteUser(id: string, pass: string) {
  const user = await UserModel.findById(id);
  if (!user) {
    return "USER NOT FOUND";
  }
  if (pass !== user.password) {
    return "INCORRECT PASSWORD";
  }

  await user.deleteOne();

  return "USER SUCCESFULLY DELETED";
}

async function getProducts(id: string, pass: string) {
  const user = await UserModel.findById(id);
  if (!user) {
    return "USER NOT FOUND";
  }
  if (pass !== user.password) {
    return "INCORRECT PASSWORD";
  }
  return user.products;
}

/**
 * Añade un producto en la base de datos
 * @param id Identificador de usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @param param2 Objeto tipo Product
 * @returns
 */
async function addProduct(
  id: string,
  pass: string,
  { name, purchase_price, sale_price, units }: Product
) {
  const user = await UserModel.findById(id);
  if (!user) {
    return "USER NOT FOUND";
  }
  if (pass !== user.password) {
    return "INCORRECT PASSWORD";
  }

  user.products?.push({
    name,
    purchase_price,
    sale_price,
    units,
  });

  user.isNew = false;
  await user.save();
  return "PRODUCT SUCCESFULLY ADDED";
}

/**
 * Borra un producto de la base de datos
 * @param id Identificador de usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @param productId Identificador del producto
 * @returns
 */
async function removeProduct(id: string, pass: string, productId: string) {
  const user = await UserModel.findById(id);
  if (!user) {
    return "USER NOT FOUND";
  }
  if (pass !== user.password) {
    return "INCORRECT PASSWORD";
  }

  /**
   * Busca el indice en la lista de productos donde
   * el id proporcionado por el usuario sea el mismo del producto a encontrar
   */
  const productIndex = user.products?.findIndex((product) =>
    product._id ? product._id.toString() === productId : -1
  );

  if (productIndex === -1) {
    return "PRODUCT NOT FOUND";
  }

  // Borra el producto registrado en el indice
  user.products?.splice(productIndex as number, 1);
  user.isNew = false;
  await user.save();
  return "PRODUCT SUCCESSFULLY DELETED";
}

/**
 * Actualiza un producto en la base de datos
 * @param id Identificador de usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @param productId Identificador del producto
 * @param param3 Objeto tipo Product
 * @returns
 */
async function updateProduct(
  id: string,
  pass: string,
  productId: string,
  { name, purchase_price, sale_price, units }: Product
) {
  const user = await UserModel.findById(id);
  if (!user) {
    return "USER NOT FOUND";
  }
  if (pass !== user.password) {
    return "INCORRECT PASSWORD";
  }

  /**
   * Busca el indice en la lista de productos donde
   * el id proporcionado por el usuario sea el mismo del producto a encontrar
   */
  const productIndex = user.products?.findIndex((product) =>
    product._id ? product._id.toString() === productId : -1
  );
  console.log(productIndex);

  if (productIndex === -1 || !productIndex) {
    return "PRODUCT NOT FOUND";
  }

  if (user.products && productIndex) {
    user.products[productIndex] = { name, purchase_price, sale_price, units };
  }

  user.isNew = false;
  await user.save();

  return "PRODUCT SUCCESSFULLY UPDATED";
}

export { getUser, updateUser, deleteUser };
export { getProducts, addProduct, removeProduct, updateProduct };
