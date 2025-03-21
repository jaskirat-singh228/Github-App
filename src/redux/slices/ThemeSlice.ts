import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

interface ThemeState {
    theme: ThemeMode;
}

const initialState: ThemeState = {
    theme: "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
        setTheme(state, action: PayloadAction<ThemeMode>) {
            state.theme = action.payload;
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
