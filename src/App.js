import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navigation from "./components/Navigation";
import pages from "./pages";
import Box from '@material-ui/core/Box';

export default function App() {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
        <Router>
            <Navigation/>
            <Box className={classes.content}>
                <Switch>
                    <Route exact path="/">
                        {pages[0].component}
                    </Route>
                    {pages.map(page =>
                        <Route path={"/" + page.name}>
                            {page.component}
                        </Route>
                    )}
                </Switch>
            </Box>
        </Router>
        </ThemeProvider>
    );
}

const useStyles = makeStyles((theme) => ({
    content: {
        height: "100vh",

        position: "relative",
        left: "56px",

        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    }
}));
