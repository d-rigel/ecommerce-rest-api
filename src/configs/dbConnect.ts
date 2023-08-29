import { connect } from "mongoose";
import { Express } from "express";
import { config } from "./config";

export const connection = async (app: Express) => {
    try {
        await connect(config.MONGO_URL);
        console.log('connected database....');
        app.listen(config.PORT, () => {
            console.log('server is running...');
        });
    } catch (err: unknown) {
        console.log(err);
    }
}