import mongoose from "mongoose";

interface UserUpdate {
  firstname?: string | undefined;
  lastname?: string | undefined;
  company?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
}

interface ProductUpdate {
  _id?: mongoose.Types.ObjectId;
  name?: string | undefined;
  units?: number | undefined;
  sale_price?: number | undefined;
  purchase_price?: number | undefined;
}

export { UserUpdate, ProductUpdate };
