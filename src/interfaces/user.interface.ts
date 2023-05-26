import mongoose from "mongoose";

/**
 * Interfaz de producto:
 * name: nombre dl producto
 * units: unidades en stock del producto
 * sale_price: precio de venta
 * purchase_price: precio de compra
 */
interface Product {
  _id?: mongoose.Types.ObjectId;
  name: string;
  units: number;
  sale_price: number;
  purchase_price: number;
}

/**
 * Interfaz de un producto vendido
 * id_product: identificador del producto vendido
 * units: unidades del producto vendido
 * total: total de la venta por el producto (Autogenerado)
 */
interface SoldProduct {
  _id?: mongoose.Types.ObjectId;
  id_product: string;
  units: number;
  total: number;
}

/**
 * Interfaz de una venta hecha
 * date: identificado de venta (Autogenerado, hora en formato HH:MM:SS.ms)
 * products: lista de productos vendidos (array de la interfaz SoldProduct)
 * total: total de la venta hechas (Autogenerado)
 */
interface Sold {
  _id?: mongoose.Types.ObjectId;
  date: string;
  products: SoldProduct[];
  total: number;
}

/**
 * Interfaz de ventas hechas en un dia:
 * date: identificador de venta (Autoogenerado, día en formato AA-MM-DD)
 * sold: Lista de ventas hechas (array de la interfaz Sold)
 * total: total de las ventas hechas en un día
 */
interface TotalSale {
  _id?: mongoose.Types.ObjectId;
  date: string;
  sold: Sold[];
  total: number;
}

/**
 * Interfaz de usuario:
 * firstname: primer nombre
 * lastname: segundo nombre
 * company: nombre del negocio
 * email: correo eletrónico del usuario
 * password: contraseña del usuario
 * products: lista de productos (Array de la interfaz Product)
 * total_sales: Lista de ventas por día (Array de la interfaz TotalSale)
 */
interface UserSchema {
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  password: string;
  products: Product[];
  total_sales: TotalSale[];
}

export { Product, SoldProduct, TotalSale, UserSchema, Sold };
