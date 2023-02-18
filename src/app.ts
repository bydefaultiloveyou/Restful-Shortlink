import express, { Request, Response } from "express";
import authRoute from "./route/auth.route";
import ShortRoute from "./route/short.route";
import { response } from "./types/response.interface";

const app = express();
app.use(express.json());

app.get("/", function (req: Request, res: Response) {
  const success: response = { code: 200, message: "Welcome" };
  res.json(success);
});

app.use(authRoute, ShortRoute);

app.listen(3000, function () {
  console.log("app runing on port", 3000);
});
