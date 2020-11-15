import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Navigation from "./components/Navigation";
import logo from './logo.png';
import pages from "./pages";

export const Context = createContext(null);

export default function App() {
    const classes = useStyles();
    const [isNavOpen, setNavOpen] = useState(false);
    const Logo = useMemo(() => () => <img src={logo} height={500} alt="Logo" />, []);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Context.Provider value={{isNavOpen, setNavOpen, Logo}}>
                <Router>
                    <Box className={clsx(classes.nav, {
                        [classes.navOpen]: isNavOpen,
                        [classes.navClosed]: !isNavOpen,
                    })}>
                        <Navigation />
                    </Box>
                    <Box className={clsx(classes.content, {
                        [classes.contentSquished]: isNavOpen,
                        [classes.contentFull]: !isNavOpen,
                    })}>
                        <Content />
                    </Box>
                </Router>
            </Context.Provider>
        </ThemeProvider>
    );
}

function Content() {
    return (
        <Switch>
            <Route exact path="/" key={0}>{pages[0].component}</Route>
            {pages.map((page, i) =>
                <Route path={"/" + page.name} key={i+1}>{page.component}</Route>
            )}
        </Switch>
    );
}

const useStyles = makeStyles((theme) => ({
    content: {
        height: "100%",
        position: "absolute",
        right: 0,
    },
    nav: {
        height: "100%",
        position: "absolute",
        left: 0,
    },
    contentFull: {
        width: `calc(100% - ${theme.spacing(7)}px)`,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentSquished: {
        width: `calc(100% - ${theme.spacing(24)}px)`,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    navClosed: {
        width: theme.spacing(6),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    navOpen: {
        width: theme.spacing(24),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));
