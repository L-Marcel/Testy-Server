import { Test } from ".prisma/client";
import { prisma } from "../../prisma/client";
import { getFirstOccurrence } from "../../util/getFirstOccurrence";

async function getTest(id: string, teacher: string): Promise<Test[]> {
  let selected = [id, teacher];

  const [_id, _teacher] = getFirstOccurrence(selected);

  const tests = await prisma.test.findMany({
    where: {
      OR: [
        { 
          id: _id
        },
        { 
          users: {
            some: {
              is_teacher: true,
              user_id: _teacher
            }
          }
        }
      ]
    }
  });

  return tests;
};

export { getTest };
