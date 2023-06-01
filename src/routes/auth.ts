import { register, signin } from "../controllers/auth";
import { validateLogin, validateRegister } from "../validators/auth";

import { Router } from "express";

const router: Router = Router();

router.post("/signup", validateRegister, register);

router.post("/signin", validateLogin, signin);

export { router };
