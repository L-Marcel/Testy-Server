import jwt from "jsonwebtoken";

async function checkAuth(token: string | undefined): Promise<false | string> {
  try {
    const { sub } = jwt.verify(token as string, process.env.AUTH_KEY as string);
    let id = sub as string;

    return id;
  } catch (error) {
    return false;
  }
};

export { checkAuth };