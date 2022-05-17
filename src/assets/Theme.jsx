import { createTheme } from "@mui/material/styles";


export const theme = createTheme({
    palette: {
        primary: {
            light: "#757ce8",
            main: "#3f50b5",
            dark: "#002884",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ffc046",
            main: "#ff8f00",
            dark: "#c56000",
            contrastText: "#000",
        },

        success: {
            light: "#4fb3bf",
            main: "#00838f",
            dark: "#005662",
            contrastText: "#000",
        },

        error: {
            light: "#ff5983",
            main: "#f50057",
            dark: "#bb002f",
            contrastText: "#000",
        },
    },
});