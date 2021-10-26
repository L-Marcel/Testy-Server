import { User } from ".prisma/client";
import { prisma } from "../../prisma/client";

async function updateUser(user: User): Promise<User> {
  const _user = await prisma.user.update({
    data: {
      name: user.name? user.name:undefined,
      email: user.email? user.email:undefined,
      avatar: user.avatar? user.avatar:undefined,
    },
    where: {
      id: user.id
    }
  });

  return _user;
};

export {
  updateUser
};