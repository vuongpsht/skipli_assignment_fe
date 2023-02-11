import { atom } from "recoil";
export interface AuthStateInterface {
  isAuth: boolean;
  phoneNumber: string;
  code: string;
}
export const authStateAtom = atom({
  key: "authStateAtom",
  default: {
    isAuth: false,
    phoneNumber: "",
    code: "",
  },
});
