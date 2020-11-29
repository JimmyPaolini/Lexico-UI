import {createMuiTheme} from "@material-ui/core/styles";
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
        fontFamily: "Helvetica Neue"
    },
    custom: {
        cardWidth: 382
    }
});
