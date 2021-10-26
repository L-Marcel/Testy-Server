import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { githubSignIn, googleSignIn } from "./signInMethods";

const config = {
  apiKey: "AIzaSyCCo7Dnyse2SbSb9wdewERCVtVNoDUepqg",
  authDomain: "testy-e9da1.firebaseapp.com",
  projectId: "testy-e9da1",
  storageBucket: "testy-e9da1.appspot.com",
  messagingSenderId: "260949557157",
  appId: "1:260949557157:web:d3487e7883a336a6b4b24c",
  measurementId: "G-FFWPDQXM3C"
};

class Firebase {
  static app: FirebaseApp;
  static auth: Auth;

  static async execute() {
    Firebase.app = initializeApp(config);
    Firebase.auth = getAuth();
    console.log("🔥 Firebase is started with success");
  };

  static async github(token: string) {
    const user = await githubSignIn(Firebase.auth, token);
    return user;
  };

  static async google(token: string) {
    const user = await googleSignIn(Firebase.auth, token);
    return user;
  };
};

export default Firebase;