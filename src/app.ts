import "dotenv/config";
import express from "express";
import cors from "cors";
import { routes } from "./routes";
import Firebase from "./services/auth/firebase/firebaseApp";

//Constants
const app = express();
const port = process.env.PORT;
const url = process.env.URL;

//App config
app.use(cors());
app.use(express.json());
app.use(routes);

//Running the app
app.listen(port, () => {
  console.clear();
  console.log(`📝 Server is running on ${url}`);

  //Firebase start
  Firebase.execute();
});

export { app };