import React, {useEffect, useState,} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import Typography from "@material-ui/core/Typography";
import Home from "./Home";
import { searchLexico } from "../globals";
import SearchResults from "./SearchResults";

let controller = new AbortController();
let signal = controller.signal;

export default function Search() {
    const classes = useStyles();

    const [search, setSearch] = useState("");
    const handleSearchChange = e => setSearch(e.target.value);

    const [results, setResults] = useState(null);
    const handleSearch = e => {
        if (e.keyCode !== 13) return;
        if (!search) {
            setResults([]);
            return;
        }
        setLoading(true);
        controller.abort()
        controller = new AbortController();
        signal = controller.signal;
        searchLexico(search, {signal}).then(entry => {
            console.log(entry);
            setResults(entry);
            setLoading(false);
        });
    }

    const [loading, setLoading] = useState(false);

    return (
        <Box>
            <Paper className={classes.searchBar}>
                {/*<IconButton className={classes.iconButton} aria-label="search">*/}
                {/*    <SearchIcon/>*/}
                {/*</IconButton>*/}
                <InputBase
                    className={classes.input}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    value={search}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearch}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon/>
                </IconButton>
                {/*<IconButton className={classes.iconButton} aria-label="miic">*/}
                {/*    <MicIcon />*/}
                {/*</IconButton>*/}
            </Paper>
            {results
                ? <SearchResults results={results}/>
                : <Home in={!results}/>}

        </Box>
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
        marginBottom: theme.spacing(12),
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    announcement: {
        padding: theme.spacing(1),
        display: "block",
        // position: "absolute",
        // width: "20%",
        // left: "30%",
        // bottom: "70%"
    }
}));