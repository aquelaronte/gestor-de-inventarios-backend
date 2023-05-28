import {
  productAdd,
  productList,
  productRemove,
  productUpdate,
} from "../controllers/products";
import {
  validateProductInfo,
  validateUpdateProductInfo,
} from "../validators/account";

import { Router } from "express";
import { checkSession } from "../middlewares/checkSession";
import { validateQueryParams } from "../utils/queryParams.validator";

const router: Router = Router();

router.get("/stock", checkSession, validateQueryParams, productList);

router.post(
  "/stock",
  checkSession,
  validateQueryParams,
  validateProductInfo,
  productAdd
);

router.put(
  "/stock",
  checkSession,
  validateQueryParams,
  validateUpdateProductInfo,
  productUpdate
);

router.delete("/stock", checkSession, validateQueryParams, productRemove);

export { router };
