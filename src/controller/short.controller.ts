import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { response } from "../types/response.interface";

const prisma = new PrismaClient();

function Generate(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const Shortlink = async function (req: Request, res: Response) {
  const { link, description } = req.body;

  try {
    const Shorlink = await prisma.shortlinks.create({
      data: {
        uuid: Generate(10),
        link,
        description,
      },
    });

    const GetLink = await prisma.shortlinks.findFirst({
      where: {
        uuid: Shorlink.uuid,
      },
    });

    const success: response = {
      code: 200,
      message: "generate shortlink success",
      data: {
        link: "http://localhost:3000/" + GetLink?.uuid,
      },
    };

    return res.json(success);
  } catch (err) {}
};

const Going = async function (req: Request, res: Response) {
  const { uuid } = req.params;
  const GetLink = await prisma.shortlinks.findFirst({
    where: {
      uuid: uuid,
    },
  });

  res.status(3001).redirect(GetLink?.link as string);
};

export { Shortlink, Going };
