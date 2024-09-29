import { atom } from "recoil";

const currentUser = atom({
  key: "currentUser",
  default: {
    userid: "",
    username: "",
    email: "",
  },
});

const sortByFilter = atom({
  key: "sortBy",
  default: "asc",
});

const categoryFilterList = atom({
  key: "categories",
  default: [""],
});

const searchFilterString = atom({
  key: "searchFilterString",
  default: "",
});

export { currentUser, sortByFilter, categoryFilterList, searchFilterString };
