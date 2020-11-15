/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import EtymologyCard from "../EtymologyCard/EtymologyCard";
import {getBookmarks} from "./BookmarksController";
import {getId, normalize} from "../../globals";

export default function BookmarksResults({searched, setLoading}) {
    // console.log("Rerendering Bookmarks");
    const classes = useStyles();

    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const bookmarks = Object.values(getBookmarks()).sort((a, b) => getId(a).localeCompare(getId(b)));
        setBookmarks(bookmarks.map((bookmark) => ({
            etymology: bookmark,
            Card: () => useMemo(() => <EtymologyCard etymology={bookmark} />, [])
        })));
    }, []);

    const [results, setResults] = useState([[]]);
    setLoading(!!results[0].length);

    let numCols = 1;
    if (useMediaQuery(theme => theme.breakpoints.up('md'))) numCols = 2;
    if (useMediaQuery(theme => theme.breakpoints.up('lg'))) numCols = 3;

    useEffect(() => {
        reorganizeBookmarks(bookmarks, numCols, setResults);
    }, [numCols]);

    useEffect(() => {
        const re = new RegExp(searched, "i");
        const filtered = bookmarks.filter((bookmark) => {
            if (normalize(getId(bookmark.etymology)).match(re)) return true;
            if (bookmark.etymology.partOfSpeech.match(re)) return true;
            if (bookmark.etymology.translations.some(tr => tr.match(re))) return true;
            return false;
        });
        reorganizeBookmarks(filtered, numCols, setResults);
    }, [searched]);

    return results.map((column, col) => {
        if (!column.length) return null;
        return <Grid item container direction="column" alignItems="center" spacing={4} className={classes.column} key={column.map(r => getId(r.etymology)).join("; ")}>
            {column.map((Bookmark, row) => (
                <Grow in={true} {...(col || row ? {timeout: 800*Math.pow(col+row,1/8)} : {})} key={getId(Bookmark.etymology)}>
                    <Grid item>
                        <Bookmark.Card />
                    </Grid>
                </Grow>
            ))}
        </Grid>
    });
}

function reorganizeBookmarks(bookmarks, numCols, setResults) {
    if (numCols <= 0 || !Array.isArray(bookmarks)) return [[]];
    setResults([...Array(numCols).keys()].map((_, col) => bookmarks.filter((_, row) => row % numCols === col)));
}

const useStyles = makeStyles((theme) => ({
    column: {
        width: 382 + 2 * theme.spacing(4)
    }
}));