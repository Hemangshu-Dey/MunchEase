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

const cartCount = atom({
  key: "cartCound",
  default: 0,
});

export {
  currentUser,
  sortByFilter,
  categoryFilterList,
  searchFilterString,
  cartCount,
};
