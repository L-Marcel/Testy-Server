import { Test } from ".prisma/client";
import { prisma } from "../../prisma/client";

async function updateTest(test: Test): Promise<Test> {
  const _test = await prisma.test.update({
    data: {
      title: test.title? test.title:undefined,
      can_edit: test.can_edit? test.can_edit:undefined,
      clue_detect: test.clue_detect? test.clue_detect:undefined,
      is_open: test.is_open? test.is_open:undefined,
      max_questions: test.max_questions? test.max_questions:undefined,
      randomize: test.randomize? test.randomize:undefined,
      time_mode: test.time_mode? test.time_mode:undefined,
    },
    where: {
      id: test.id,
    },
  });

  return _test;
};

export {
  updateTest
};