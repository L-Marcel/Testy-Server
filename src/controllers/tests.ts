import { Test } from ".prisma/client";
import { Request, Response } from "express";
import { checkIsTestAdmin } from "../services/test/checkIsTestAdmin";
import { createTest } from "../services/test/createTest";
import { deleteTest } from "../services/test/deleteTest";
import { getTest } from "../services/test/getTest";
import { updateTest } from "../services/test/updateTest";

class Tests {
  static async list(req: Request, res: Response) {
    let { id, teacher } = req.query;
    id = !!id? id as string:"";
    teacher = !!teacher? teacher as string:"";

    const user = await getTest(id, teacher);
  
    if(user.length <= 0){
      return res.json({
        message: "You need id or teacher id valid to list tests"
      });
    };

    return res.json(user);
  };
  
  static async create(req: Request, res: Response) {
    const test = req.body as Test;
    const user_id = req.user_id;

    const _test = await createTest(test, user_id);

    return res.json(_test);
  };

  static async update(req: Request, res: Response) {
    const test = req.body as Test;
    const user_id = req.user_id;
    
    const _userOnTest = await checkIsTestAdmin(user_id, test.id);

    if(!!_userOnTest){
      return res.status(401).json({
        message: "You need a valid id and authorization to update an test"
      });
    };

    const _test = await updateTest(test);

    return res.json(_test);
  };

  static async delete(req: Request, res: Response) {
    const { id } = req.body as Test;
    const user_id = req.user_id;

    const _userOnTest = await checkIsTestAdmin(user_id, id);

    if(!!_userOnTest){
      return res.status(401).json({
        message: "You need a valid id and authorization to delete an test"
      });
    };

    const test = await deleteTest(id);

    return res.json(test);
  };
};

export { Tests };