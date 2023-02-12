import { useRecoilState } from "recoil";
import {
  authStateAtom,
  AuthStateInterface,
  AuthStepEnum,
} from "../store/atoms/authAtoms";
import { api } from "../api";
import { redirect, useNavigate } from "react-router-dom";
import React from "react";

export const useAuthFlow = () => {
  const [authState, setAuthState] =
    useRecoilState<AuthStateInterface>(authStateAtom);
  const navigate = useNavigate();
  const createNewAccessCode = (phoneNumber: string) => {
    if (phoneNumber) {
      api
        .POST("users/createNewAccessCode", { phoneNumber: phoneNumber })
        .then((res) => {
          if (res.data.status) {
            setAuthState((pre) => ({
              ...pre,
              phoneNumber,
              step: AuthStepEnum.VerifyAccess,
            }));
          }
        })
        .catch(console.log);
    }
  };

  const verifyAccessCode = (code: string) => {
    const { phoneNumber } = authState;
    api
      .POST("users/validateAccessCode", { phoneNumber, code })
      .then((res) => {
        console.log(res);
        if (res?.data?.status) {
          setAuthState((pre) => ({
            ...pre,
            isAuth: true,
            step: AuthStepEnum.GetAccessCode,
          }));
          localStorage.setItem("isAuth", "true");
          navigate("/");
        }
      })
      .catch(console.log);
  };
  return { ...authState, createNewAccessCode, verifyAccessCode, setAuthState };
};

export const useAuthCheck = () => {
  const [authState] = useRecoilState<AuthStateInterface>(authStateAtom);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authState.isAuth) {
      navigate("/login");
    }
  }, [authState.isAuth]);
};
