import { User } from ".prisma/client";
import { prisma } from "../../prisma/client";

async function createUser(user: User): Promise<User> {
  const _user = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }
  });

  return _user;
};

export {
  createUser
};