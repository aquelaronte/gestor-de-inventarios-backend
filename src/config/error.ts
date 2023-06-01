import { ClientErrorInterface } from "../interfaces/error.interface";

export class ClientError extends Error {
  statusCode: number;
  constructor(msg: string, statusCode: number) {
    super(msg);
    this.name = "ClientError";
    this.statusCode = statusCode;
  }
}
