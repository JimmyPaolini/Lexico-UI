/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import LiteratureCard from "./LiteratureCard";
import SearchBar from "../Search/SearchBar";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link, useHistory } from "react-router-dom";
import {romanNumeralize} from "../../globals";

export default function Literature() {
    const classes = useStyles();
    const [literatureSearch, setLiteratureSearch] = useState(window.location.pathname);
    const [resultsOriginal, setResultsOriginal] = useState(null);
    const [results, setResults] = useState(null);
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
        searchLiterature(literatureSearch).then(results => {
            setResultsOriginal(results);
            setResults(results);
            setLoading(false);
        });
    }, [literatureSearch]);

    let numCols = 1;
    if (useMediaQuery(theme => theme.breakpoints.up('md'))) numCols = 2;
    if (useMediaQuery(theme => theme.breakpoints.up('lg'))) numCols = 3;
    if (useMediaQuery(theme => theme.breakpoints.up('xl'))) numCols = 4;

    // useEffect(() => {
    //     reorganizeLiterature(results, numCols, setResults);
    // }, [numCols]);

    useEffect(() => {
        setResults(filterResults(resultsOriginal, searched))
    }, [searched]);

    const handleSearchChange = e => {
        setSearch(e.target.value);
        if (!e.target.value) setSearched(e.target.value);
    }
    
    return (
        <Grid container direction="column" justify="flex-start" alignItems="center">
            <SearchBar 
                {...{search, loading, handleSearchChange, target}}
                handleSearchExecute={() => setSearched(search)} 
                target={target || "literature"}/>
            <Grid item container justify="center">
                {results && results.children.map((child, i) => (
                    <Grow in={!loading} {...(i ? {timeout: 800*Math.pow(i,1/8)} : {})} key={JSON.stringify(child)}>
                        <Grid item className={classes.card} component={Link} to={window.location.pathname + "/" + (child.title || child)} >
                            <LiteratureCard name={child.title || child} object={child}/>
                        </Grid>
                    </Grow>
                ))}
            </Grid>
        </Grid>
    );
}

async function searchLiterature(path) {
    const url = "https://i9ic4m487l.execute-api.us-east-1.amazonaws.com/literature/" + path.replace(/\/literature\/?/, "");
    return await fetch(url).then(r => r.json());
}

function reorganizeLiterature(results, numCols, setResults) {
    if (numCols <= 0 || !Array.isArray(results)) return [[]];
    setResults([...Array(numCols).keys()].map((_, col) => results.filter((_, row) => row % numCols === col)));
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