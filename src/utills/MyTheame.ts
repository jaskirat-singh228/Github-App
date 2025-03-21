import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { Colors } from "./Colors";

interface Theme {
    dark: boolean;
    colors: {
        background: string;
        border: string;
        card: string;
        notification: string;
        primary: string;
        text: string;
    };
}

export const lightTheme: Theme = {
    dark: false,
    colors: {
        background: Colors.light_background,
        border: Colors.light_border,
        card: Colors.light_card,
        notification: Colors.light_notification,
        primary: Colors.themeColor,
        text: Colors.light_text,
    },
};

export const darkTheme: Theme = {
    dark: true,
    colors: {
        background: Colors.dark_background,
        border: Colors.dark_border,
        card: Colors.dark_card,
        notification: Colors.dark_notification,
        primary: Colors.themeColor,
        text: Colors.dark_text,
    },
};

export const useCustomTheme = (): Theme => {
    const themeMode = useSelector((state: RootState) => state.theme.theme);
    return themeMode === "dark" ? darkTheme : lightTheme;
};
