import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const CreateToken = function (username: string) {
  return jwt.sign({ username }, process.env.PRIVATE_KEY_JWT as string, {
    expiresIn: 60 * 60,
  });
};

export { CreateToken };
