/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LiteratureCard from "./LiteratureCardMiddle";
import SearchBar from "../Search/SearchBar";
import { Link, useHistory } from "react-router-dom";
import CardDeck from "../CardDeck";
import {romanNumeralize} from "../../globals";

export default function LiteratureMiddle() {
    const classes = useStyles();
    const [literatureSearch, setLiteratureSearch] = useState(window.location.pathname);
    const [resultsOriginal, setResultsOriginal] = useState(null);
    const [results, setResults] = useState(null);
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState("");
    const [searched, setSearched] = useState("");
    const [loading, setLoading] = useState(false);
    const target = romanNumeralize(decodeURI(window.location.pathname.split("/").pop()).replace(/\.txt/, ''))
    const history = useHistory();

    useEffect(() => {
        const unlisten = history.listen(({pathname}) => setLiteratureSearch(pathname));
        return () => unlisten();
    }, []);
    
    useEffect(() => {
        setLoading(true);
        searchLiterature(literatureSearch).then(response => {
            setResultsOriginal(response);
            setResults(response);
            setLoading(false);
        });
    }, [literatureSearch]);


    useEffect(() => {
        setResults(filterResults(resultsOriginal, searched))
    }, [searched]);

    const handleSearchChange = e => {
        setSearch(e.target.value);
        if (!e.target.value) setSearched(e.target.value);
    }

    useEffect(() => {
        if (!results) return;
        setCards(results.children.map(child => ({
            key: JSON.stringify(child),
            item: child,
            Card: () => <Box component={Link} to={window.location.pathname + "/" + (child.title || child)} >
                <LiteratureCard name={child.title || child} object={child} author={child.author || results.author}/>
            </Box>
        })));
    }, [results]);
    
    return (
        <Grid container direction="column" justify="flex-start" alignItems="center">
            <Grid item>
                <SearchBar 
                    {...{search, loading, handleSearchChange, target}}
                    handleSearchExecute={() => setSearched(search)} 
                    target={target || "literature"}/>
            </Grid>
            <Grid item container justify="center">
                {results && <CardDeck cards={cards} />}
            </Grid>
        </Grid>
    );
}

async function searchLiterature(path) {
    const url = "https://i9ic4m487l.execute-api.us-east-1.amazonaws.com/literature/" + path.replace(/\/literature\/?/, "");
    return await fetch(url).then(r => r.json());
}

function filterResults(results, search) {
    if (!results) return results;
    const re = new RegExp(search, "i");
    return {...results, children: results.children.filter((child) => {
        console.log(child)
        if (child.author && child.author.match(re)) return true;
        if (child.title && (child.title.match(re) || romanNumeralize(child.title).match(re))) return true;
        if (!child.title && (child.match(re) || romanNumeralize(child).match(re))) return true;
        return child.children && child.children.some(child => child.match(re));
    })};
}

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(2),
    }
}));