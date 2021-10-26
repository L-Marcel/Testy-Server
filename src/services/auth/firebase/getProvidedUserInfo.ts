import Firebase from "./firebaseApp";
import { LoginResponse } from "./signInMethods";

async function getProvidedUserInfo(token: string, path: string): Promise<LoginResponse> {
  if(path.includes("google")){
    return await Firebase.google(token);
  } else if(path.includes("github")) {
    return await Firebase.github(token);
  };

  return await Firebase.google(token);
};

export { getProvidedUserInfo };