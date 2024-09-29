import { atom } from "recoil";

interface ProductResponse {
  productId: string;
  quantity: number;
}

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

const totalOrderPrice = atom({
  key: "totalPrice",
  default: 0,
});

const productList = atom<ProductResponse[]>({
  key: "productList",
  default: [],
});

export {
  currentUser,
  sortByFilter,
  categoryFilterList,
  searchFilterString,
  cartCount,
  totalOrderPrice,
  productList,
};
