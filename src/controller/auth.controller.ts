import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Brypct from "bcrypt";
import { response } from "../types/response.interface";
import { CreateToken } from "./jwt.controller";

const prisma = new PrismaClient();

const Register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  Brypct.hash(password, 10, async function (error, hash) {
    const User = await prisma.users.create({
      data: { username, email, password: hash },
    });

    res.status(200).json({
      code: 200,
      message: "success",
      token: CreateToken(username),
      data: User,
    });
  });
};

const Login = async function (req: Request, res: Response) {
  const { username, email, password } = req.body;
  const User = await prisma.users.findFirst({
    where: {
      username: username,
    },
  });

  Brypct.compare(password, User?.password as string, function (err, result) {
    if (result) {
      const success: response = {
        code: 200,
        message: "success",
        token: CreateToken(username),
        data: User,
      };

      return res.json(success);
    }
    const failure: response = {
      code: 500,
      message: "Login failed, password no match",
      data: null,
    };
    return res.json(failure);
  });
};

export { Register, Login };
