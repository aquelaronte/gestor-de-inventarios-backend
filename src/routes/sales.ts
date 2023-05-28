import { deleteSale, getProductSales, makeSale } from "../controllers/sales";
import { validateDeleteSale, validateMakeSale } from "../validators/sales";

import { Router } from "express";
import { checkSession } from "../middlewares/checkSession";
import { validateQueryParams } from "../utils/queryParams.validator";

const router: Router = Router();

router.get("/", validateQueryParams, checkSession, getProductSales);
router.post("/", validateQueryParams, checkSession, validateMakeSale, makeSale);
router.delete(
  "/",
  validateQueryParams,
  checkSession,
  validateDeleteSale,
  deleteSale
);

export { router };
