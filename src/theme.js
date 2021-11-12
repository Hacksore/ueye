import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  overrides: {
  },
  palette: {
    background: {
      paper: "#303030",
    },
    text: {
      primary: "#ffffff",
    },
    primary: {
      contrastText: "#fff",
      main: "#252525",
    }
  },
});

export { theme };
