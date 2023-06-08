import { NextFunction, Request, Response } from "express";

import { ClientError } from "../../config/error";
import { handleHTTPError } from "../../utils/error.handler";

function signUpValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const { firstname, lastname, email, password, company } = req.body;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let faultData: string[] = [];
    if (
      !firstname ||
      typeof firstname != "string" ||
      firstname.trim().length == 0
    ) {
      faultData.push("firstname");
    }
    if (
      !lastname ||
      typeof lastname != "string" ||
      lastname.trim().length == 0
    ) {
      faultData.push("lastname");
    }
    if (
      !email ||
      typeof email != "string" ||
      email.trim().length == 0 ||
      !emailPattern.test(email) ||
      email.trim().length != email.length
    ) {
      faultData.push("email");
    }
    if (
      !password ||
      typeof password != "string" ||
      password.trim().length == 0 ||
      password.trim().length != password.length ||
      password.length < 8 ||
      password.length > 16
    ) {
      faultData.push("password");
    }
    if (!company || typeof company != "string" || company.trim().length == 0) {
      faultData.push("company");
    }
    if (faultData.length >= 1) {
      throw new ClientError("INVALID USER'S PROVIDED DATA", 400, faultData);
    }
    next();
  } catch (err: ClientError | unknown) {
    handleHTTPError(res, err);
  }
}

function signInValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const faultData: string[] = [];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !email ||
      typeof email != "string" ||
      email.trim().length == 0 ||
      !emailPattern.test(email) ||
      email.trim().length != email.length
    ) {
      faultData.push("email");
    }
    if (
      !password ||
      typeof password != "string" ||
      password.trim().length == 0 ||
      password.trim().length != password.length ||
      password.length < 8 ||
      password.length > 16
    ) {
      faultData.push("password");
    }
    if (faultData.length >= 1) {
      throw new ClientError("INVALID USER'S PROVIDED DATA", 400, faultData);
    }
    next();
  } catch (err: ClientError | unknown) {
    handleHTTPError(res, err);
  }
}

export { signUpValidator, signInValidator };
