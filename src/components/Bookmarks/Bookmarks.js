/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchBar from "../Search/SearchBar";
import EtymologyCard from "../EtymologyCard/EtymologyCard";
import CardDeck from "../CardDeck";
import {getBookmarks} from "./BookmarksController";
import {getId, normalize} from "../../globals";

export default function Bookmarks() {
    const classes = useStyles();

    const [search, setSearch] = useState("");
    const [searched, setSearched] = useState("");

    const handleSearchChange = e => {
        setSearch(e.target.value);
        if (!e.target.value) setSearched(e.target.value);
    }

    const [loading, setLoading] = useState(true);

    const [bookmarksOriginal, setBookmarksOriginal] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const bookmarks = Object.values(getBookmarks())
            .sort((a, b) => getId(a).localeCompare(getId(b)))
            .map(bookmark => ({
                key: getId(bookmark),
                etymology: bookmark,
                Card: () => useMemo(() => <EtymologyCard etymology={bookmark} />, [])
            }));
        setBookmarksOriginal(bookmarks);
    }, []);

    useEffect(() => {
        const re = new RegExp(searched, "i");
        const filtered = bookmarksOriginal.filter(bookmark => {
            if (normalize(getId(bookmark.etymology)).match(re)) return true;
            if (bookmark.etymology.partOfSpeech.match(re)) return true;
            if (bookmark.etymology.translations.some(tr => tr.match(re))) return true;
            return false;
        });
        setBookmarks(filtered);
        setLoading(false);
    }, [searched, bookmarksOriginal]);

    return (
        <Grid container direction="column" justify="flex-start" alignItems="center">
            <SearchBar 
                {...{search, loading, handleSearchChange}}
                handleSearchExecute={() => setSearched(search)} 
                target="bookmarks"/>
            <Grid item container wrap="nowrap" justify="center">
                {!bookmarks.length && <Typography variant="h4">Nihil</Typography>}
                <CardDeck cards={bookmarks} />
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({

}));