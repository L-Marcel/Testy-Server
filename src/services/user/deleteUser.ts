import { User } from ".prisma/client";
import { prisma } from "../../prisma/client";

async function deleteUser(id: string): Promise<User> {
  const _user = await prisma.user.delete({
    where: {
      id: id
    },
  });

  return _user;
};

export {
  deleteUser
};