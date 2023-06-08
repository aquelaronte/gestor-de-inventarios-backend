import {
  addProductsValidator,
  productIdValidator,
  productUpdateValidator,
} from "../middlewares/validators/products";
import {
  productAdd,
  productList,
  productRemove,
  productUpdate,
} from "../controllers/products";

import { Router } from "express";
import { checkSession } from "../middlewares/checkSession";
import { idValidator } from "../middlewares/validators/id";

const router: Router = Router();

router.get("/", checkSession, idValidator, productList);

router.post("/", checkSession, idValidator, addProductsValidator, productAdd);

router.put(
  "/",
  checkSession,
  idValidator,
  productIdValidator,
  productUpdateValidator,
  productUpdate
);

router.delete(
  "/",
  checkSession,
  idValidator,
  productIdValidator,
  productRemove
);

export { router };
