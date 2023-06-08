import { userDelete, userInfo, userUpdateInfo } from "../controllers/profile";

import { Router } from "express";
import { checkSession } from "../middlewares/checkSession";
import { idValidator } from "../middlewares/validators/id";
import { profileUpdateValidator } from "../middlewares/validators/profile";

const router: Router = Router();

router.get("/", checkSession, idValidator, userInfo);

router.put(
  "/",
  checkSession,
  idValidator,
  profileUpdateValidator,
  userUpdateInfo
);

router.delete("/", checkSession, idValidator, userDelete);

export { router };
