/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchBar from "../Search/SearchBar";
import BookmarksResults from "./BookmarksResults";

export default function Bookmarks() {
    const classes = useStyles();

    const [search, setSearch] = useState("");
    const [searched, setSearched] = useState("");
    const [loading, setLoading] = useState(true);

    const handleSearchChange = e => {
        setSearch(e.target.value);
        if (!e.target.value) setSearched(e.target.value);
    }

    return (
        <Grid container direction="column" justify="flex-start" alignItems="center">
            <SearchBar 
                {...{search, loading, handleSearchChange}}
                handleSearchExecute={() => setSearched(search)} 
                target="bookmarks"/>
            <Grid item container wrap="nowrap" justify="center">
                <BookmarksResults {...{searched, setLoading}} />
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({

}));