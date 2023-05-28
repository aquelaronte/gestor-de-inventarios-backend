import { Document, Schema, model } from "mongoose";

import { UserSchema as AuthUserSchema } from "../interfaces/user.interface";

interface UserDocument extends Document, AuthUserSchema {}

const UserSchema = new Schema<UserDocument>({
  profile: {
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
      required: false,
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
  sales: [
    {
      date: {
        type: String,
        required: false,
        unique: false,
      },
      sales_info: [
        {
          time: {
            type: String,
            required: false,
            unique: false,
          },
          sold_items: [
            {
              product_id: {
                type: String,
                required: false,
                unique: false,
              },
              units: {
                type: Number,
                required: false,
                unique: false,
              },
              product_total: {
                type: Number,
                required: false,
                unique: false,
              },
            },
          ],
          sale_total: {
            type: Number,
            required: false,
            unique: false,
          },
        },
      ],
      sales_total: {
        type: Number,
        required: false,
        unique: false,
      },
    },
  ],
});

const UserModel = model<UserDocument>("User", UserSchema);

export { UserModel };
