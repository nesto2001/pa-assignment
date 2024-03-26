import { signInWithEmailAndPassword } from "firebase/auth";

import { ILoginRequest } from "../types/auth";
import { auth } from "./firebaseConfig";

export const login = async ({ email, password }: ILoginRequest) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((err) => {
      const errMessage = err.message;
      throw new Error(`${errMessage}`);
    });
};
