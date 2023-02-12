import { atom } from "recoil";
export enum AuthStepEnum {
  GetAccessCode,
  VerifyAccess,
}

export interface AuthStateInterface {
  isAuth: boolean;
  phoneNumber: string;
  code: string;
  step: AuthStepEnum;
}

export const authStateAtom = atom({
  key: "authStateAtom",
  default: {
    isAuth: !!localStorage.getItem("isAuth"),
    phoneNumber: "",
    code: "",
    step: AuthStepEnum.GetAccessCode,
  },
});
