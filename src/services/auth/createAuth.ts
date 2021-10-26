import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

async function createAuth(user: User) {
  const token = jwt.sign({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }, process.env.AUTH_KEY, {
    subject: user.id,
    expiresIn: 1000 * 60 * 60 * 24
  });

  return "Bearer " + token; 
};

export { createAuth };