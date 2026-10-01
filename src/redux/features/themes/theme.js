import{ createSlice} from "@reduxjs/toolkit";


const getThemeFromLocalStorage = () => {
  try {
    return localStorage.getItem("theme")=== "dark" ? "dark" : "light";;
  } catch  {
    return "light";
  }
}

export const themeSlice = createSlice({
  name: "theme",
  initialState:{
    theme: getThemeFromLocalStorage()
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    }
  }
});


export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;      