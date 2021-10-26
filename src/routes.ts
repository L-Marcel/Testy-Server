import express from "express";
import { Tests } from "./controllers/tests";
import { Users } from "./controllers/users";
import { Auth } from "./middlewares/auth";
import Firebase from "./services/auth/firebase/firebaseApp";
const routes = express.Router();

//It's necessary? My typscript is stranger sometimes
declare global {
  namespace Express {
    interface Request {
      user_id: string
    }
  }
}

//User routes
routes.get("/auth/google", Users.logIn);
routes.get("/auth/github", Users.logIn);
routes.get("/auth/email", Users.logIn);
routes.get("/users", Users.list);
routes.post("/users/create", Users.create);
routes.post("/users/update", Auth, Users.update);
routes.delete("/users/delete", Auth, Users.delete);

//Test routes
routes.get("/tests", Tests.list);
routes.post("/tests/create", Auth, Tests.create);
routes.post("/tests/update", Auth, Tests.update);
routes.delete("/tests/delete", Auth, Tests.delete);

export { routes };