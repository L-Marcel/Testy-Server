import { Auth, GithubAuthProvider, GoogleAuthProvider, signInWithCredential } from "firebase/auth";

export type LoginResponse = LoginFailureResponse | LoginSuccessResponse;
export type LoginFailureResponse = {
  status: "failure",
  error: {
    code: number,
    message: string,
    email: string,
    credential: any
  }
};
export type LoginSuccessResponse =  {
  status: "success",
  data: {
    email: string;
    name: string;
    avatar: string;
  }
};

async function githubSignIn(auth: Auth, token: string): Promise<LoginResponse> {
  const credential = GithubAuthProvider.credential(token);
  const res: LoginResponse = await signInWithCredential(auth, credential)
  .then((result) => {
    const user = result.user;

    return {
      status: "success",
      data: {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL
      }
    } as LoginSuccessResponse;
  }).catch((error) => {
    const code = error.code;
    const message = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);

    return {
      status: "failure",
      error: {
        code,
        message,
        email,
        credential
      }
    } as LoginFailureResponse;
  });

  return res;
};

async function googleSignIn(auth: Auth, token: string): Promise<LoginResponse> {
  const credential = GoogleAuthProvider.credential(token);

  const res: LoginResponse = await signInWithCredential(auth, credential)
  .then((result) => {
    const user = result.user;

    return {
      status: "success",
      data: {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL
      }
    } as LoginSuccessResponse;
  }).catch((error) => {
    const code = error.code;
    const message = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);

    return {
      status: "failure",
      error: {
        code,
        message,
        email,
        credential
      }
    } as LoginFailureResponse;
  });

  return res;
};

export { githubSignIn, googleSignIn };