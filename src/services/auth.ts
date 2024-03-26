import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "./firebaseConfig";
import { ILoginRequest } from "../types/auth";

export const login = async ({ email, password }: ILoginRequest) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((err) => {
      const errorCode = err.code;
      const errMessage = err.message;
      throw new Error(`${errMessage}`);
    });
};
