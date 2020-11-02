import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
// import MicIcon from '@material-ui/icons/Mic';
// import Typography from "@material-ui/core/Typography";

export default function SearchBar({search, handleSearchChange, handleSearch}) {
    const classes = useStyles();

    return (
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
}));