export class ClientError extends Error {
  statusCode: number;
  data: string[] | undefined;
  constructor(msg: string, statusCode: number, data?: string[]) {
    super(msg);
    this.name = "ClientError";
    this.statusCode = statusCode;
    this.data = data;
  }
}
