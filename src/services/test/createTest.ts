import { Test, UserOnTest } from ".prisma/client";
import { prisma } from "../../prisma/client";

async function createTest(test: Test, teacher_id: string): Promise<[Test, UserOnTest]> {
  const _test = await prisma.test.create({
    data: {
      title: test.title,
      can_edit: test.can_edit,
      clue_detect: test.clue_detect,
      is_open: test.is_open,
      max_questions: test.max_questions,
      randomize: test.randomize,
      time_mode: test.time_mode,
    }
  });

  const _teacher = await prisma.userOnTest.create({
    data: {
      is_teacher: true,
      test_id: _test.id,
      user_id: teacher_id
    }
  });

  return [_test, _teacher];
};

export { createTest };