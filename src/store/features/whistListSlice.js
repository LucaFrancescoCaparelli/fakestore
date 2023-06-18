import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  products: localStorage.getItem("whish-list")
    ? JSON.parse(localStorage.getItem("whish-list"))
    : [],
};

const toastTexts = {
  add: {
    text: "Product added to wish list",
    icon: "❤️",
  },
  added: {
    text: "This product is already added to the wish list",
    icon: "",
  },
  remove: {
    text: "Product removed from the wish list",
    icon: "💔",
  },
};

const whishListSlice = createSlice({
  name: "whistList",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // WhistList 0
      if (!state.products.length) {
        state.products.push({ ...action.payload });
        toast.success(`${toastTexts.add.text}`, {
          position: toast.POSITION.TOP_RIGHT,
          icon: toastTexts.add.icon,
        });
        localStorage.setItem("whish-list", JSON.stringify(state.products));
        return;
      }

      const productInWhishList = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (productInWhishList) {
        toast.warning(`${toastTexts.added.text}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return state;
      }
      state.products.push({ ...action.payload });
      toast.success(`${toastTexts.add.text}`, {
        position: toast.POSITION.TOP_RIGHT,
        icon: toastTexts.add.icon,
      });
      localStorage.setItem("whish-list", JSON.stringify(state.products));
    },
    removeProduct: (state, action) => {
      const newList = state.products.filter(
        (product) => product.id !== action.payload
      );
      toast.error(`${toastTexts.remove.text}`, {
        position: toast.POSITION.TOP_RIGHT,
        icon: toastTexts.remove.icon,
      });
      state.products = newList;
      localStorage.setItem("whish-list", JSON.stringify(state.products));
    },
  },
});

export const { addProduct, removeProduct } = whishListSlice.actions;
export default whishListSlice.reducer;
