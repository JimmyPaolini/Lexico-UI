import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from "@material-ui/core/CircularProgress";
// import MicIcon from '@material-ui/icons/Mic';
// import Typography from "@material-ui/core/Typography";

export default function SearchBar({search, handleSearchChange, handleSearch, loading}) {
    const classes = useStyles();
    const input = useRef();

    // useEffect(() => input.current.focus(), []);

    useEffect(() => {
        const focusSearchBarKeybind = e => {
            if (e.key === "Escape") return input.current.blur();
            if (e.key !== "Enter") return;
            if (input.current === document.activeElement) input.current.blur();
            else {
                input.current.focus();
                input.current.select();
            }
        }
        window.addEventListener("keydown", focusSearchBarKeybind);
        return () => window.removeEventListener("keydown", focusSearchBarKeybind);
    });

    return (
        <Paper className={classes.searchBar}>
            {/*<IconButton className={classes.iconButton} aria-label="search">*/}
            {/*    <SearchIcon/>*/}
            {/*</IconButton>*/}
            <InputBase
                id="searchBar"
                className={classes.input}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search', ref: input }}
                value={search}
                onChange={handleSearchChange}
                onKeyDown={handleSearch}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                {!loading ? <SearchIcon/> : <CircularProgress size={24} thickness={5.4} color="secondary" />}
            </IconButton>
            {/*<IconButton className={classes.iconButton} aria-label="miic">*/}
            {/*    <MicIcon />*/}
            {/*</IconButton>*/}
        </Paper>
    );
}

const useStyles = makeStyles((theme) => ({
    searchBar: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        width: 382,
        height: 46,
        padding: '2px 4px',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(8),
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        fontSize: 20
    },
    iconButton: {
        padding: 10,
    },
}));