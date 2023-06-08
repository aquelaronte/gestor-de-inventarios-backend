import { deleteSale, getProductSales, makeSale } from "../controllers/sales";
import {
  saleAddValidator,
  saleIdValidator,
} from "../middlewares/validators/sales";

import { Router } from "express";
import { checkSession } from "../middlewares/checkSession";
import { idValidator } from "../middlewares/validators/id";

const router: Router = Router();

router.get("/", checkSession, idValidator, getProductSales);
router.post("/", checkSession, saleAddValidator, makeSale);
router.delete("/", checkSession, idValidator, saleIdValidator, deleteSale);

export { router };
