import {configureStore }from "@reduxjs/toolkit";
import themeReducer from "./features/themes/theme";


export const store = configureStore({
  reducer:{ 
    theme: themeReducer,
  },

});