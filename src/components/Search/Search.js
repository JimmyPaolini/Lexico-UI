/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { searchLexico } from "../../globals";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Typography from "@material-ui/core/Typography";
import Home from "./Home";

let controller = new AbortController();
const clearSignal = () =>  {
    controller.abort()
    controller = new AbortController();
    return controller.signal;
};

export default function Search() {
    const classes = useStyles();

    const [search, setSearch] = useState("");
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState("");

    const handleSearchExecute = e => {
        setResults(null);
        if (!search) return;
        setLoading(true);
        searchLexico(search, {signal: clearSignal()}).then(results => {
            setResults(results);
        }).catch(error => {
            setResults("not found");
        }).finally(() => {
            setLoading(false);
            setSearched(search);
        });
    }

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item>
                <SearchBar search={search} handleSearchChange={e => setSearch(e.target.value)} handleSearchExecute={handleSearchExecute} loading={loading} target="lexico"/>
            </Grid>
            <Grid item container justify="center">
                {!results && <Home />}
                {results === "not found" && <Typography variant="h4" color="textPrimary">Not found</Typography>}
                <SearchResults results={results} searched={searched}/>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({

}));