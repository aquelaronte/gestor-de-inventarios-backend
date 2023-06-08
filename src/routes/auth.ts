import { register, signin } from "../controllers/auth";
import {
  signInValidator,
  signUpValidator,
} from "../middlewares/validators/auth";

import { Router } from "express";

const router: Router = Router();

router.post("/signup", signUpValidator, register);

router.post("/signin", signInValidator, signin);

export { router };
