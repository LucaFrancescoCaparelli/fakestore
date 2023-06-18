import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
};

const toastTexts = {
  successLogin: {
    text: "Welcome",
    icon: "👋",
  },
  successLogOut: {
    text: "Goodbye",
    icon: "👋",
  },
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const name = action.payload.user.name;
      const token = action.payload.token;

      state.user = { name, token };
      toast.success(`${toastTexts.successLogin.text} ${name}`, {
        position: toast.POSITION.TOP_CENTER,
        icon: toastTexts.successLogin.icon,
      });
      localStorage.setItem("user", JSON.stringify({ name, token }));
    },
    clearCredentials: (state) => {
      toast.success(`${toastTexts.successLogOut.text} ${state.user.name}`, {
        position: toast.POSITION.TOP_RIGHT,
        icon: toastTexts.successLogOut.icon,
      });
      state.user = {};
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
