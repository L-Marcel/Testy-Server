import { UserOnTest } from "@prisma/client";
import { prisma } from "../../prisma/client";

async function checkIsTestAdmin(teacher_id: string, test_id: string): Promise<UserOnTest | boolean> {
  const userOnTest = await prisma.userOnTest.findFirst({
    where: {
      test_id,
      user_id: teacher_id,
      is_teacher: true
    }
  });

  if(!!userOnTest){
    return false;
  };

  return userOnTest;
};

export { checkIsTestAdmin };