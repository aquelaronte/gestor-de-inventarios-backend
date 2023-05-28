import { SaleInfo, SoldItem } from "../interfaces/user.interface";
import { UserModel } from "../models/user";
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
    throw new Error("USER NOT FOUND");
  }
  if (pass !== user.profile.password) {
    throw new Error("INCORRECT PASSWORD");
  }
  return user.sales;
}

/**
 * Añade una venta en la base de datos
 * @param id Identificador del usuario
 * @param pass Cobtrasela encriptada del usuario
 * @param param2 objeto tipo Sold
 * @returns Si fue exitosa la operación
 */
async function addSale(id: string, pass: string, soldProducts: SoldItem[]) {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error("USER NOT FOUND");
  }
  if (pass !== user.profile.password) {
    throw new Error("INCORRECT PASSWORD");
  }
  if (user.products.length == 0) {
    throw new Error("USER MUST HAVE AT LEAST ONE PRODUCT");
  }

  // Validar la lista pasada
  soldProducts.forEach((product, index) => {
    if (product.product_id === undefined) {
      throw new Error(`PRODUCT ${index} ON LIST DON'T PROVIDE AN ID`);
    }
    if (product.units === undefined) {
      throw new Error(`PRODUCT ${index} ON LIST DON'T PROVIDE SOLD UNITS`);
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

  let last_index = user.sales!.length - 1;

  // Se abre la primera caja
  if (last_index == -1) {
    last_index++;
  }
  if (user.sales[last_index] == undefined) {
    user.sales[last_index] = {
      date: id_day,
      sales_info: [],
      sales_total: 0,
    };
  }
  // Recorremos el array products para validar todas las ventas antes de registrar la venta
  for (let i = 0; i < user.products.length; i++) {
    for (let j = 0; j < soldProducts.length; j++) {
      // Verificar si el id del producto en stock es el mismo al id del producto a vender
      if (user.products[i]._id?.toString() == soldProducts[j].product_id) {
        // Verificamos si las unidades a vender son mayores que las que hay en stock
        if (user.products[i].units < soldProducts[j].units) {
          throw new Error("INVALID SALE, SOLD UNITS < PRODUCT IN STOCK");
        }
        // Restamos las unidades del stock por las vendidas
        user.products[i].units -= soldProducts[j].units;
        // Obtenemos el total de la venta de un producto (unidades vendidas * precio de venta)
        soldProducts[j].product_total =
          soldProducts[j].units * user.products[i].sale_price;
      }
    }
  }
  let total: number = 0;
  soldProducts.forEach((sale) => {
    total += sale.product_total!;
  });
  const additional_sale = <SaleInfo>{
    time: id_sale,
    sold_items: soldProducts,
    sale_total: total,
  };
  user.sales[last_index].sales_info!.push(additional_sale);
  user.sales[last_index].sales_total! += total;
  user.isNew = false;
  await user.save();
  return user.sales;
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
    throw new Error("USER NOT FOUND");
  }
  if (pass !== user.profile.password) {
    throw new Error("INCORRECT PASSWORD");
  }
  if (user.products.length == 0) {
    throw new Error("USER DON'T HAVE PRODUCTS");
  }

  // Averiguamos el indice del día
  let sale_day = user.sales!.findIndex(
    (total_sale) => total_sale.date == id_day
  );

  if (sale_day == -1) {
    throw new Error("DAY NOT FOUND");
  }

  // Averiguamos el índice de la venta
  let sale_time = user.sales![sale_day].sales_info?.findIndex(
    (sale) => sale.time == id_sale
  );

  if (sale_time == -1) {
    throw new Error("SALE NOT FOUND");
  }

  const sold = user.sales![sale_day].sales_info![sale_time as number]!;

  // Antes de eliminar la venta, se restauran los productos del stock
  for (let i = 0; i < user.products!.length; i++) {
    for (let j = 0; j < sold.sold_items.length; j++) {
      if (user.products![i]._id?.toString() == sold.sold_items[j].product_id) {
        user.products![i].units += sold.sold_items[j].units;
      }
    }
  }
  // Se restaura de igual manera el total sin la venta hecha
  user.sales[sale_day].sales_total! -= sold.sale_total;

  // Despues de validar que existe el dia y la venta, procedemos a borrar la venta
  user.sales![sale_day].sales_info?.splice(sale_time as number, 1);
  user.isNew = false;
  await user.save();
  return user.sales;
}

export { getSales, addSale, removeSale };
