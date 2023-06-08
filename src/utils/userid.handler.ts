import { ClientError } from "../config/error";
import { UserModel } from "../models/user";

async function userIdErrorHandler(id: string) {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error();
    }
    return user;
  } catch {
    throw new ClientError("USER NOT FOUND", 404);
  }
}

export { userIdErrorHandler };
