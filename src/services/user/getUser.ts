import { User } from ".prisma/client";
import { prisma } from "../../prisma/client";
import { getFirstOccurrence } from "../../util/getFirstOccurrence";

async function getUser(id: string, email: string, test: string, answer: string): Promise<User[]> {
  let selected = [id, email, test, answer];

  const [_id, _email, _test, _answer] = getFirstOccurrence(selected);

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { 
          id: _id
        },
        {
          email: _email
        },
        { 
          tests: {
            some: {
              test_id: _test
            }
          },
        },
        { 
          answers: {
            some: {
              id: _answer
            }
          }
        }
      ]
    }
  });

  return users;
};

export { getUser };
