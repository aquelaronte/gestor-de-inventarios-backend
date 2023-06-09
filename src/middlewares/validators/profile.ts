import { NextFunction, Request, Response } from "express";

import { ClientError } from "../../config/error";
import { handleHTTPError } from "../../utils/error.handler";
import { capitalizeArray, capitalizeString } from "../../utils/capitalize.util";

function profileUpdateValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const faultData: string[] = [];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let { firstname, lastname, email, password, company } = req.body;
    if (
      firstname != undefined &&
      (typeof firstname != "string" || firstname.trim().length == 0)
    ) {
      faultData.push(`firstname`);
    } else if (firstname) {
      firstname = capitalizeString(firstname);
    }
    if (
      lastname != undefined &&
      (typeof lastname != "string" || lastname.trim().length == 0)
    ) {
      faultData.push(`lastname`);
    } else if (lastname) {
      lastname = capitalizeString(lastname);
    }
    if (
      email != undefined &&
      (typeof email != "string" ||
        email.trim().length == 0 ||
        !emailPattern.test(email) ||
        email.trim().length != email.length)
    ) {
      faultData.push(`email`);
    }
    if (
      password != undefined &&
      (typeof password != "string" || password.trim().length == 0)
    ) {
      faultData.push(`password`);
    }
    if (
      company != undefined &&
      (typeof company != "string" || company.trim().length == 0)
    ) {
      faultData.push(`company`);
    } else if (company) {
      company = capitalizeString(company);
    }
    if (faultData.length >= 1) {
      throw new ClientError("INVALID USER'S PROFILE DATA", 400, faultData);
    }
    next();
  } catch (err: ClientError | unknown) {
    console.log(err);

    handleHTTPError(res, err);
  }
}

export { profileUpdateValidator };
