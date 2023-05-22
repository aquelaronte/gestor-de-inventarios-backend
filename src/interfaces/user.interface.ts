import mongoose from "mongoose";

/**
 * Interfaz de producto:
 * id: identificador de producto (autogenerado, Hora en formato UNIX)
 * name: nombre dl producto
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

interface SoldProduct {
  _id?: mongoose.Types.ObjectId;
  id_product: string;
  units: number;
  total: number;
}

interface Sold {
  _id?: mongoose.Types.ObjectId;
  date: string;
  products: SoldProduct[];
  total: number;
}

/**
 * Interfaz de ventas hechas en un dia:
 * date: identificador de venta (Autoogenerado, hora en formato AA-MM-DD)
 * sold: Lista de ventas hechas (array de la interfaz Sold)
 */
interface TotalSale {
  _id?: mongoose.Types.ObjectId;
  date?: string;
  sold?: Sold[];
  total?: number;
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
  firstname?: string;
  lastname?: string;
  company?: string;
  email?: string;
  password?: string;
  products?: Product[];
  total_sales?: TotalSale[];
}

export { Product, SoldProduct, TotalSale, UserSchema, Sold };
