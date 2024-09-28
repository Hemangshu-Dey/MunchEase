import { atom } from "recoil";

const currentUser = atom({
  key: "currentUser",
  default: {
    userid: "",
    username: "",
    email: "",
  },
});

export { currentUser };
