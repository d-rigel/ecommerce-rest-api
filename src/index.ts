import express, { Express, Request, Response } from "express";
import { connection } from "./configs/dbConnect";
import productRouter from "./routes/productRoute";
import authRouter from "./routes/authRoute";
import { errorHandler } from "./middlewares/errorHandlers/errorHandler";
import cartRouter from "./routes/cartRoute";
import orderRouter from "./routes/orderRoute";
import cors from "cors";

const app: Express = express();
app.use(express.json());

app.use(cors({
  credentials: true,
}));


app.get('/', (req: Request, res: Response) => {
 res.json({
  status: "running"
 })
});

app.use('/api/v1/products', productRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/orders', orderRouter);

app.use(errorHandler);
connection(app);
