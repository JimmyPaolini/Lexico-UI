import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({

    palette: {
        type: "dark",
        primary: {
            main: "#66023C"
        },
        secondary: {
            main: "#02662C",
        },
        background: {
            default: "#66023C"
        }
    },

    typography: {
        fontFamily: "Helvetica Neue",
        literature: {
            fontFamily: "Serif",
            fontWeight: 400,
            fontSize: "1.5rem",
            lineHeight: 2.5,
            letterSpacing: "0.00938em",
        }
    },

    custom: {
        cardWidth: 382
    }

});
