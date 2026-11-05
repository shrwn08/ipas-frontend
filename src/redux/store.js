import {configureStore }from "@reduxjs/toolkit";
import themeReducer from "./features/themes/theme";
import authReducer from "./features/auth/auth"


export const store = configureStore({
  reducer:{ 
    theme: themeReducer,
    auth : authReducer,
  },

});


let lastToken = store.getState().auth.token;

store.subscribe(() => {
  const { token } = store.getState().auth;
  if (token === lastToken) return;

  lastToken = token;

  try {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  } catch {}
});