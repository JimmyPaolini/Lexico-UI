/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchBar from "./SearchBar";
import Typography from "@material-ui/core/Typography";
import CardDeck from "../CardDeck";
import Home from "./Home";
import EtymologyCard from "../EtymologyCard/EtymologyCard";
import {getId} from "../../globals";

let controller = new AbortController();
const clearSignal = () =>  {
    controller.abort();
    controller = new AbortController();
    return controller.signal;
};

export default function Search() {
    const classes = useStyles();

    const [search, setSearch] = useState("");
    const [results, setResults] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [isLatin, setLatin] = useState(true);

    const handleSearchChange = e => {
        setSearch(e.target.value);
        // if (!e.target.value) setResults(undefined);
    }

    const handleSearchExecute = () => {
        if (!search) return;
        setLoading(true);
        searchDictionary(search, isLatin, {signal: clearSignal()}).then(response => {
            setResults(response.map(etymology => ({
                key: getId(etymology),
                Card: () => useMemo(() => <EtymologyCard etymology={etymology} searched={isLatin ? search : null}/>, [])
            })));
        }).catch(error => {
            setResults(null);
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item>
                <SearchBar {...{search, loading, handleSearchChange, handleSearchExecute, isLatin, setLatin}} target="lexico"/>
            </Grid>
            <Grid item container justify="center">
                {results === undefined && <Home />}
                {results === null && <Typography variant="h4">Not found</Typography>}
                {results && <CardDeck cards={results} />}
            </Grid>
        </Grid>
    );
}

async function searchDictionary(search, isLatin, args) {
    const url = `https://i9ic4m487l.execute-api.us-east-1.amazonaws.com/${isLatin ? "latin" : "english"}?search=`;
    return await fetch(url + search, args).then(r => r.json());
}

const useStyles = makeStyles((theme) => ({

}));