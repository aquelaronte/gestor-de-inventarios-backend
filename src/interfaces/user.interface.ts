import { Types } from "mongoose";

/**
 * Interfaz de producto:
 * name: nombre dl producto
 * units: unidades en stock del producto
 * sale_price: precio de venta
 * purchase_price: precio de compra
 */
interface Product {
  _id?: Types.ObjectId;
  name: string;
  units: number;
  sale_price: number;
  purchase_price: number;
}

/**
 * Interfaz de un producto vendido
 * product_id: identificador del producto vendido
 * units: unidades del producto vendido
 * product_total: total de la venta por el producto (Autogenerado)
 */
interface SoldItem {
  _id?: Types.ObjectId;
  product_id: string;
  units: number;
  product_total?: number;
}

/**
 * Interfaz de una venta hecha
 * time: identificador de venta (Autogenerado, hora en formato HH:MM:SS.ms)
 * products: lista de productos vendidos (array de la interfaz SoldProduct)
 * total: total de la venta hechas (Autogenerado)
 */
interface SaleInfo {
  _id?: Types.ObjectId;
  time?: string;
  sold_items: SoldItem[];
  sale_total: number;
}

/**
 * Interfaz de ventas hechas en un dia:
 * date: identificador de venta (Autoogenerado, día en formato AA-MM-DD)
 * sales_info: Lista de ventas hechas (array de la interfaz Sold)
 * sales_total: total de las ventas hechas en un día
 */
interface Sale {
  _id?: Types.ObjectId;
  date: string;
  sales_info: SaleInfo[];
  sales_total: number;
}

/**
 * Interfaz de perfil:
 * firstname: primer nombre
 * lastname: segundo nombre
 * company: nombre del negocio
 * email: correo eletrónico del usuario
 * password: contraseña del usuario
 */
interface Profile {
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  password: string;
}

/**
 * Interfaz de usuario:
 * profile: información del perfil de usuario
 * products: lista de productos (Array de la interfaz Product)
 * total_sales: Lista de ventas por día (Array de la interfaz TotalSale)
 */
interface UserSchema {
  profile: Profile;
  products: Product[];
  sales: Sale[];
}

export { Product, SoldItem, Sale, UserSchema, SaleInfo };
