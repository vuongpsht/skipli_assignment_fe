import { atom } from "recoil";

export const searchStateAtom = atom({
  key: "searchStateAtom",
  default: {
    items: [],
    pageCount: 0,
  },
});
