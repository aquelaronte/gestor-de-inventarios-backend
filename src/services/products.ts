import { ClientError } from "../config/error";
import { Product } from "../interfaces/user.interface";
import { ProductUpdate } from "../interfaces/account.interface";
import { UserModel } from "../models/user";
import { userIdErrorHandler } from "../utils/userid.handler";
import { refillStock } from "../interfaces/product.interface";

/**
 * Obtiene los productos en la cuenta del usuario
 * @param id Identificador del usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @returns Los productos del usuario
 */
async function getProducts(id: string) {
  const user = await userIdErrorHandler(id);
  return user.products;
}

/**
 * Añade un producto en la base de datos
 * @param id Identificador de usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @param product Objeto tipo Product
 * @returns Los productos del usuario
 */
async function addProduct(id: string, products: Product[]) {
  const user = await userIdErrorHandler(id);
  products.forEach((product) => {
    product.name =
      product.name.charAt(0).toLocaleUpperCase() +
      product.name.slice(1).toLocaleLowerCase();
  });
  user.products! = [...user.products!, ...products];
  user.isNew = false;
  await user.save();
  return user.products;
}

/**
 * Borra un producto de la base de datos
 * @param id Identificador de usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @param productId Identificador del producto
 * @returns Lista actualizada
 */
async function removeProduct(id: string, productId: string) {
  const user = await userIdErrorHandler(id);

  /**
   * Busca el indice en la lista de productos donde
   * el id proporcionado por el usuario sea el mismo del producto a encontrar
   */
  const productIndex = user.products!.findIndex(
    (product: Product) => product._id!.toString() === productId
  );

  if (productIndex === -1) {
    throw new Error("PRODUCT NOT FOUND");
  }

  // Borra el producto registrado en el indice
  user.products!.splice(productIndex as number, 1);
  user.isNew = false;
  await user.save();
  return user.products;
}

/**
 * Actualiza un producto en la base de datos
 * @param id Identificador de usuario en la base de datos
 * @param pass La contraseña encriptada por el usuario
 * @param productId Identificador del producto
 * @param producto Objeto tipo Product
 * @returns
 */
async function updateProduct(
  id: string,
  productId: string,
  { name, purchase_price, sale_price, units }: ProductUpdate
) {
  const user = await userIdErrorHandler(id);
  /**
   * Busca el indice en la lista de productos donde
   * el id proporcionado por el usuario sea el mismo del producto a encontrar
   */
  const productIndex = user.products!.findIndex(
    (product: Product) => product._id!.toString() === productId
  );

  if (productIndex === -1) {
    throw new ClientError("PRODUCT NOT FOUND", 404);
  }

  // Validaciones, valida las propiedades, si las pasadas por el usuario son undefined entonces no se actualizan
  // Pero si no son undefined y son diferentes a las ya puestas entonces se actualizan
  if (name !== undefined && user.products[productIndex].name !== name) {
    user.products[productIndex].name =
      name.charAt(0).toLocaleUpperCase() + name.slice(1).toLocaleLowerCase();
  }

  if (
    purchase_price !== undefined &&
    user.products[productIndex].purchase_price !== purchase_price
  ) {
    user.products[productIndex].purchase_price = purchase_price;
  }

  if (
    sale_price !== undefined &&
    user.products[productIndex].sale_price !== sale_price
  ) {
    user.products[productIndex].sale_price = sale_price;
  }

  if (units !== undefined && user.products[productIndex].units !== units) {
    user.products[productIndex].units = units;
  }

  user.isNew = false;
  await user.save();

  return user.products;
}

async function refillStock(id: string, stock: refillStock[]) {
  const user = await userIdErrorHandler(id);
  for (let i = 0; i < user.products.length; i++) {
    const product = user.products[i];
    for (let j = 0; j < stock.length; j++) {
      const refillProduct = stock[j];
      if (product._id!.toString() == refillProduct.product_id) {
        user.products[i].units += refillProduct.units;
      }
    }
  }
  user.isNew = false;
  await user.save();

  return user.products;
}
export { getProducts, addProduct, removeProduct, updateProduct };
