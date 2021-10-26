import { User } from ".prisma/client";
import { Request, Response } from "express";
import { getProvidedUserInfo } from "../services/auth/firebase/getProvidedUserInfo";
import { createUser } from "../services/user/createUser";
import { deleteUser } from "../services/user/deleteUser";
import { getUser } from "../services/user/getUser";
import { updateUser } from "../services/user/updateUser";

class Users {
  static async logIn(req: Request, res: Response) {
    const token = req.headers.token as string | undefined;
    const path = req.path;

    if(!token){
      return res.status(401).json({
        message: "Provider token is invalid or expired"
      });
    };
  
    const auth = await getProvidedUserInfo(token, path);
  
    if(auth.status === "failure"){
      return res.status(401).json({
        message: "Error on get user info from Provider API"
      });
    };
  
    const user = auth.data;
  
    res.json(user);
  };

  static async list(req: Request, res: Response) {
    let { id, email, test, answer } = req.query;
    id = !!id? id as string:"";
    email = !!email? email as string:"";
    test = !!test? test as string:"";
    answer = !!answer? answer as string:"";

    const user = await getUser(id, email, test, answer);
  
    if(user.length <= 0){
      return res.json({
        message: "You need id, email, test id or answer id valid to list users"
      });
    };

    return res.json(user);
  };

  static async create(req: Request, res: Response) {
    const user = req.body as User;

    const _user = await createUser(user);

    return res.json(_user);
  };

  static async update(req: Request, res: Response) {
    const user = req.body as User;
    
    const _user = await updateUser(user);

    return res.json(_user);
  };

  static async delete(req: Request, res: Response) {
    const { id } = req.body as User;

    const user = await deleteUser(id);

    return res.json(user);
  };
}

export { Users };