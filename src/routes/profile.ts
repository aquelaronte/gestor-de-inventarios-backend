import { userDelete, userInfo, userUpdateInfo } from "../controllers/profile";

import { Router } from "express";
import { checkSession } from "../middlewares/checkSession";
import { validateQueryParams } from "../utils/queryParams.validator";
import { validateUpdateUserInfo } from "../validators/account";

const router: Router = Router();

router.get("/", checkSession, validateQueryParams, userInfo);

router.put(
  "/user",
  checkSession,
  validateQueryParams,
  validateUpdateUserInfo,
  userUpdateInfo
);

router.delete("/", checkSession, validateQueryParams, userDelete);

export { router };
