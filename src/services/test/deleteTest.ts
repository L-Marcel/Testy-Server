import { Test } from ".prisma/client";
import { prisma } from "../../prisma/client";

async function deleteTest(id: string): Promise<Test> {
  const _test = await prisma.test.delete({
    where: {
      id: id
    },
  });

  return _test;
};

export {
  deleteTest
};