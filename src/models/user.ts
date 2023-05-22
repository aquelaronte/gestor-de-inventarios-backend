import { Schema, model, Types, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import {
  UserSchema as AuthUserSchema,
  SoldProduct,
} from "../interfaces/user.interface";

interface UserDocument extends Document, AuthUserSchema {}

const UserSchema = new Schema<UserDocument>({
  firstname: {
    type: String,
    unique: false,
    required: true,
  },
  lastname: {
    type: String,
    unique: false,
    required: true,
  },
  company: {
    type: String,
    unique: false,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: false,
    required: true,
  },
  products: [
    {
      name: {
        type: String,
        unique: false,
        required: false,
      },
      units: {
        type: Number,
        unique: false,
        required: false,
      },
      sale_price: {
        type: Number,
        unique: false,
        required: false,
      },
      purchase_price: {
        type: Number,
        unique: false,
        required: false,
      },
    },
  ],
  total_sales: [
    {
      date: {
        type: String,
        required: false,
        unique: false,
      },
      sold: [
        {
          date: {
            type: String,
            required: false,
            unique: false,
          },
          products: [
            {
              id_product: {
                type: String,
                required: false,
                unique: false,
              },
              units: {
                type: Number,
                required: false,
                unique: false,
              },
              total: {
                type: String,
                required: false,
                unique: false,
              },
            },
          ],
          total: {
            type: Number,
            required: false,
            unique: false,
          },
        },
      ],
      total: {
        type: Number,
        required: false,
        unique: false,
      },
    },
  ],
});

UserSchema.plugin(uniqueValidator);

const UserModel = model<UserDocument>("User", UserSchema);

export { UserModel };
