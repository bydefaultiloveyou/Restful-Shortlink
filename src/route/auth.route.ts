import express from "express";
import { Register, Login } from "../controller/auth.controller";

const authRoute = express.Router();

authRoute.post("/v1/user/login", Login);

authRoute.post("/v1/user/register", Register);

export default authRoute;
