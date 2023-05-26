import { UserModel } from "../models/user";
import { SoldProduct, TotalSale, Sold } from "../interfaces/user.interface";
import { zeroPad } from "../utils/zeroPad.util";

/**
 * Obtiene las ventas de la base de datos
 * @param id Identificador del usuario
 * @param pass Contraseña encriptada del usuario
 * @returns Las ventas del usuario
 */
async function getSales(id: string, pass: string) {
  const user = await UserModel.findById(id);
  if (!user) {
    return "USER NOT FOUND";
  }
  if (pass !== user.password) {
    return "INCORRECT PASSWORD";
  }
  return user.total_sales;
}

/**
 * Añade una venta en la base de datos
 * @param id Identificador del usuario
 * @param pass Cobtrasela encriptada del usuario
 * @param param2 objeto tipo Sold
 * @returns Si fue exitosa la operación
 */
async function addSale(id: string, pass: string, soldProducts: SoldProduct[]) {
  const user = await UserModel.findById(id);
  if (!user) {
    return "USER NOT FOUND";
  }
  if (pass !== user.password) {
    return "INCORRECT PASSWORD";
  }
  if (user.products.length == 0) {
    return "USER DON'T HAVE PRODUCTS";
  }

  // Validar la lista pasada
  soldProducts.forEach((product, index) => {
    if (product.id_product === undefined) {
      return `Product number ${index} on list don't provide an id`;
    }
    if (product.units === undefined) {
      return `Product number ${index} on list don't provide units has been sold`;
    }
  });

  const calendar = new Date();

  // Template string que contiene el dia en formato AA-MM-DD
  const id_day = `${calendar.getFullYear()}-${zeroPad(
    calendar.getMonth() + 1
  )}-${zeroPad(calendar.getDate())}`;

  // Template string que contiene la hora en formato HH:MM:SS.ms
  const id_sale = `${zeroPad(calendar.getHours())}:${zeroPad(
    calendar.getMinutes()
  )}:${zeroPad(calendar.getSeconds())}.${calendar.getMilliseconds()}`;

  let last_index = user.total_sales!.length - 1;

  // Se abre la primera caja
  if (last_index == -1) {
    last_index++;
  }
  if (user.total_sales[last_index] == undefined) {
    user.total_sales[last_index] = {
      date: id_day,
      sold: [],
      total: 0,
    };
  }
  // Recorremos el array products para validar todas las ventas antes de registrar la venta
  for (let i = 0; i < user.products.length; i++) {
    for (let j = 0; j < soldProducts.length; j++) {
      // Verificar si el id del producto en stock es el mismo al id del producto a vender
      if (user.products[i]._id?.toString() == soldProducts[j].id_product) {
        // Verificamos si las unidades a vender son mayores que las que hay en stock
        if (user.products[i].units < soldProducts[j].units) {
          return "INVALID SALE: sold units < product in stock";
        }
        // Restamos las unidades del stock por las vendidas
        user.products[i].units -= soldProducts[j].units;
        // Obtenemos el total de la venta de un producto (unidades vendidas * precio de venta)
        soldProducts[j].total =
          soldProducts[j].units * user.products[i].sale_price;
      }
    }
  }
  let total: number = 0;
  soldProducts.forEach((sale) => {
    total += sale.total;
  });
  const additional_sale = <Sold>{
    date: id_sale,
    products: soldProducts,
    total: total,
  };
  user.total_sales[last_index].sold!.push(additional_sale);
  user.total_sales[last_index].total! += total;
  user.isNew = false;
  await user.save();
  return user.total_sales;
}

/**
 * Borra una venta de la base de datos
 * @param id Identificador del usuario
 * @param pass Contraseña encriptada del usuario
 * @param date Id del dia
 * @param id_sale Id de la venta
 * @returns Si fue exitosa la operación
 */
async function removeSale(
  id: string,
  pass: string,
  id_day: string,
  id_sale: string
) {
  const user = await UserModel.findById(id);
  if (!user) {
    return "USER NOT FOUND";
  }
  if (pass !== user.password) {
    return "INCORRECT PASSWORD";
  }
  if (user.products.length == 0) {
    return "USER DON'T HAVE PRODUCTS";
  }

  // Averiguamos el indice del día
  let index_total_sale = user.total_sales!.findIndex(
    (total_sale) => total_sale.date == id_day
  );

  if (index_total_sale == -1) {
    return "DAY NOT FOUND";
  }

  // Averiguamos el índice de la venta
  let index_sale = user.total_sales![index_total_sale].sold?.findIndex(
    (sale) => sale.date == id_sale
  );

  if (index_sale == -1) {
    return "SALE NOT FOUND";
  }

  const sold = user.total_sales![index_total_sale].sold![index_sale as number]!;

  // Antes de eliminar la venta, se restauran los productos del stock
  for (let i = 0; i < user.products!.length; i++) {
    for (let j = 0; j < sold.products.length; j++) {
      if (user.products![i]._id?.toString() == sold.products[j].id_product) {
        user.products![i].units += sold.products[j].units;
      }
    }
  }
  // Se restaura de igual manera el total sin la venta hecha
  user.total_sales[index_total_sale].total! -= sold.total;

  // Despues de validar que existe el dia y la venta, procedemos a borrar la venta
  user.total_sales![index_total_sale].sold?.splice(index_sale as number, 1);
  user.isNew = false;
  await user.save();
  return "SALE SUCCESSFULLY DELETED";
}

export { getSales, addSale, removeSale };
