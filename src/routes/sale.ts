import { Router } from "express";
import { checkSession } from "../middlewares/checkSession";
import { deleteSale, getProductSales, makeSale } from "../controllers/sale";

const router: Router = Router();

router.get("/", checkSession, getProductSales);
router.post("/", checkSession, makeSale);
router.delete("/", checkSession, deleteSale);
router.put("/", checkSession);

export { router };
