import { Router } from "express";
import { checkSession } from "../middlewares/checkSession";
import {
  productAdd,
  productList,
  productRemove,
  productUpdate,
  userDelete,
  userInfo,
  userUpdateInfo,
} from "../controllers/products";
import {
  validateProductInfo,
  validateQueryParams,
  validateUserInfo,
} from "../validators/products";

const router: Router = Router();

/**
 * Valida si tiene sesión iniciada, luego valida los headers del usuario y le muestra la información de la cuenta del usuario
 */
router.get("/user", checkSession, validateQueryParams, userInfo);

/**
 * Valida si tiene sesión iniciada, luego valida los headers del usuario, luego valida la información entregada por el usuario y actualiza la información de perfil
 */
router.put(
  "/user",
  checkSession,
  validateQueryParams,
  validateUserInfo,
  userUpdateInfo
);

/**
 * Valida si tiene sesión iniciada, luego valida los headers del usuario y borra el perfil
 */
router.delete("/user", checkSession, validateQueryParams, userDelete);

/**
 * Valida si tiene sesión iniciada, luego valida los headers del usuario y actualiza la información de productos del perfil
 */
router.get("/stock", checkSession, validateQueryParams, productList);

/**
 * Valida si tiene sesión iniciada, luego valida los headers del usuario, luego valida la información entregada por el usuario y añade un producto al perfil
 */
router.post(
  "/stock",
  checkSession,
  validateQueryParams,
  validateProductInfo,
  productAdd
);

/**
 * Valida si tiene sesión iniciada, luego valida los headers del usuario y borra un  producto del perfil
 */
router.delete("/stock", checkSession, validateQueryParams, productRemove);

/**
 * Valida si tiene sesión iniciada, luego valida los headers del usuario, luego valida la información entregada por el usuario y actualiza un producto
 */
router.put(
  "/stock",
  checkSession,
  validateQueryParams,
  validateProductInfo,
  productUpdate
);

export { router };
