import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchResults from "../Search/SearchResults";
import {getBookmarks} from "./BookmarksController";
import {getId} from "../../globals";


export default function Bookmarks() {
    const classes = useStyles();
    const [bookmarks, ] = useState(getBookmarks());
    const results = Object.values(bookmarks).sort((a, b) => getId(a).localeCompare(getId(b)));

    return (
        <Grid container justify="center" alignItems="center" className={classes.bookmarks}>
            <SearchResults results={results} searched=""/>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({
    bookmarks: {
        marginTop: theme.spacing(8)
    }
}));