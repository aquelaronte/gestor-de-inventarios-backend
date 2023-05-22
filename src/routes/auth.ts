import { Router } from "express";
import { register, login } from "../controllers/auth";
import { validateLogin, validateRegister } from "../validators/auth";

const router: Router = Router();

/** Valida los datos entregados por el usuario y luego lo registra */
router.post("/signup", validateRegister, register);

/** Valida los datos entregados por el usuario y luego lo registra */
router.post("/login", validateLogin, login);

export { router };
