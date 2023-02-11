import React from "react";
import { useRecoilState } from "recoil";
import { authStateAtom, AuthStateInterface } from "../store/atoms/authAtoms";
import { api } from "../api";

export const useAuthFlow = () => {
  const [authState, setAuthState] =
    useRecoilState<AuthStateInterface>(authStateAtom);

  const createNewAccessCode = React.useCallback(() => {
    const { phoneNumber } = authState;
    api
      .post("users/createNewAccessCode", { phoneNumber: "+840334188451" })
      .then(console.log)
      .catch(console.log);
  }, [authState]);

  const verifyAccessCode = React.useCallback(() => {
    const { phoneNumber, code } = authState;
    api
      .post("users/validateAccessCode", { phoneNumber, code })
      .then(console.log)
      .catch(console.log);
  }, [authState]);
  return { ...authState, createNewAccessCode, verifyAccessCode };
};
