/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LiteratureCardRoot from "./LiteratureCardRoot";
import SearchBar from "../Search/SearchBar";
import CardDeck from "../CardDeck";
import literature from "../../literature";

export default function LiteratureLibrary() {
    const classes = useStyles();
    const [results, setResults] = useState(literature.map(author => ({
        key: author.title,
        Card: () => useMemo(() => <LiteratureCardRoot author={author} />, [])
    })));
    const [search, setSearch] = useState("");
    const [searched, setSearched] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const filtered = !searched ? literature : filterLiterature(literature, searched);
        setResults(filtered.map(author => ({
            key: author.title,
            Card: () => useMemo(() => <LiteratureCardRoot author={author} />, [])
        })));
    }, [searched]);

    const handleSearchChange = e => {
        setSearch(e.target.value);
        if (!e.target.value) setSearched(e.target.value);
    }

    return (
        <Grid container direction="column" justify="flex-start" alignItems="center">
            <Grid item>
                <SearchBar 
                    {...{search, loading, handleSearchChange}}
                    handleSearchExecute={() => setSearched(search)} 
                    target="literature"/>
            </Grid>
            <Grid item container justify="center">
                {results && <CardDeck cards={results} />}
            </Grid>
        </Grid>
    );
}

// async function searchLiterature(path) {
//     const url = "https://i9ic4m487l.execute-api.us-east-1.amazonaws.com/literature/" + path.replace(/\/literature\/?/, "");
//     const response = await fetch(url).then(r => r.json());
//     return response;
// }

function filterLiterature(literature, searched) {
    const re = new RegExp(searched, "i");
    return literature.filter(item => filterItem(item));

    function filterItem(item) {
        if (item.title.match(re) || (item.subtitle && item.subtitle.match(re))) return true;
        return item.children && item.children.filter(child => filterItem(child)).length;
    }
}

const useStyles = makeStyles((theme) => ({
}));