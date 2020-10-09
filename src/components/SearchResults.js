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
// import words from "../words.json";
import { searchLexico } from "../globals";

let controller = new AbortController();
let signal = controller.signal;

export default function Search() {
    const classes = useStyles();

    const [search, setSearch] = useState("");
    const handleSearchChange = e => setSearch(e.target.value);

    const [result, setResult] = useState([]);
    useEffect(() => {
        controller.abort()
        if (!search) return;
        controller = new AbortController();
        signal = controller.signal;
        searchLexico(search, {signal}).then(result => {
            console.log(result);
            setResult(result)
        });
    }, [search]);

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
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon/>
                </IconButton>
                {/*<IconButton className={classes.iconButton} aria-label="miic">*/}
                {/*    <MicIcon />*/}
                {/*</IconButton>*/}
            </Paper>
            <Home in={!search}/>
        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    searchBar: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        width: 400,
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