import { NextFunction, Request, Response } from "express";
import { checkAuth } from "../services/auth/checkAuth";

async function Auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  const id = await checkAuth(token);

  if(!id){
    return res.status(401).json({
      message: "Token is invalid or expired"
    });
  };
  
  req.user_id = id;

  return next();
};

export { Auth };