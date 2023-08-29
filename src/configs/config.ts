import * as dotenv from "dotenv";
dotenv.config();

export const config = {
    PORT: process.env.PORT || 4000,
    MONGO_URL: process.env.MONGO_URL || "",
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || ""
}