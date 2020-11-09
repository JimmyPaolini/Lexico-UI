import React, { createContext } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Navigation from "./components/Navigation";
import pages from "./pages";

export const Context = createContext(null);

export default function App() {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Context.Provider value={{}}>
                <Router>
                    <Grid container justify="center">
                        <Grid item>
                            <Navigation />
                        </Grid>
                        <Grid item xs container justify="center">
                            <Switch>
                                <Route exact path="/">{pages[0].component}</Route>
                                {pages.map(page =>
                                    <Route path={"/" + page.name}>{page.component}</Route>
                                )}
                            </Switch>
                        </Grid>
                    </Grid>
                </Router>
            </Context.Provider>
        </ThemeProvider>
    );
}

const useStyles = makeStyles((theme) => ({

}));
