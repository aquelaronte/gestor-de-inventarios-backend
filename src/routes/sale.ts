import { Router } from "express";
import { checkSession } from "../middlewares/checkSession";
import { deleteSale, getProductSales, makeSale } from "../controllers/sale";
import { validateQueryParams } from "../utils/queryParams.validator";
import { validateDeleteSale, validateMakeSale } from "../validators/sale";

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
