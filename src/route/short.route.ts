import express from "express";
import { Going, Shortlink } from "../controller/short.controller";

const ShortRoute = express.Router();

ShortRoute.post("/v1/link/generate", Shortlink);

ShortRoute.get("/:uuid", Going);

export default ShortRoute;
