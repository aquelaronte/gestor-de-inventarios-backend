import { ProductUpdate, UserUpdate } from "../interfaces/account.interface";
import { Product } from "../interfaces/user.interface";
import { UserModel } from "../models/user";
import { encrypt, verify } from "../utils/encrypt.handler";

/**
 * Obtiene la información de perfil del usuario desde la base de datos
 * @param id Identificador de usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @returns Los datos del usuario
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
 * @param param2 Objeto tipo UserRegister
 * @returns Los datos del usuario
 */
async function updateUser(id: string, pass: string, information: UserUpdate) {
  const user = await UserModel.findById(id);
  if (!user) {
    return "USER NOT FOUND";
  }
  if (pass != user.password) {
    return "INCORRECT PASSWORD";
  }

  console.log(information.firstname);

  user.firstname =
    information.firstname !== undefined &&
    information.firstname !== user.firstname
      ? information.firstname
      : user.firstname;
  user.lastname =
    information.lastname !== undefined && information.lastname !== user.lastname
      ? information.lastname
      : user.lastname;
  user.company =
    information.company !== undefined && information.company !== user.company
      ? information.company
      : user.company;
  user.email =
    information.email !== undefined && information.email !== user.email
      ? information.email
      : user.email;

  if (information.password != undefined) {
    const verifyPassword = await verify(
      information.password as string,
      user.password
    );
    if (!verifyPassword) {
      const hashPass = await encrypt(information.password as string);
      user.password = hashPass;
    }
  }

  user.isNew = false;
  await user.save();

  return user;
}

/**
 * Elimina el perfil del usuario
 * @param id Identificador de usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @returns Si fue exitosa la operación
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

/**
 * Obtiene los productos en la cuenta del usuario
 * @param id Identificador del usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @returns Los productos del usuario
 */
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
 * @returns Los productos del usuario
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

  user.products!.push({
    name,
    purchase_price,
    sale_price,
    units,
  });

  user.isNew = false;
  await user.save();
  return user.products;
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
  const productIndex = user.products!.findIndex((product) =>
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
  { name, purchase_price, sale_price, units }: ProductUpdate
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
  const productIndex = user.products!.findIndex((product) =>
    product._id ? product._id.toString() === productId : -1
  );

  if (productIndex === -1) {
    return "PRODUCT NOT FOUND";
  }

  // Validaciones, valida las propiedades, si las pasadas por el usuario son undefined entonces no se actualizan
  // Pero si no son undefined y son diferentes a las ya puestas entonces se actualizan
  user.products[productIndex].name =
    name !== undefined && user.products[productIndex].name !== name
      ? name
      : user.products[productIndex].name;
  user.products[productIndex].purchase_price =
    purchase_price !== undefined &&
    user.products[productIndex].purchase_price !== purchase_price
      ? purchase_price
      : user.products[productIndex].purchase_price;
  user.products[productIndex].sale_price =
    sale_price !== undefined &&
    user.products[productIndex].sale_price !== sale_price
      ? sale_price
      : user.products[productIndex].sale_price;
  user.products[productIndex].units =
    units !== undefined && user.products[productIndex].units !== units
      ? units
      : user.products[productIndex].units;

  user.isNew = false;
  await user.save();

  return user.products;
}

export { getUser, updateUser, deleteUser };
export { getProducts, addProduct, removeProduct, updateProduct };
