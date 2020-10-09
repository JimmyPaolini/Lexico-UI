import React, { useState, } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import Typography from "@material-ui/core/Typography";
import Fade from '@material-ui/core/Fade';
import logo from '../logo.png';
import words from "../words.json";

export default function Search() {
    const classes = useStyles();
    const [search, setSearch] = useState("");
    let result = [];
    const handleSearchChange = e => {
        setSearch(e.target.value);
        result = words.filter(word => word.match(new RegExp("^" + e.target.value, "i")));
        result += words.filter(word => word.match(new RegExp(".+" + e.target.value, "i")));
        console.log(result);
    }

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
            <Fade in={!search}>
                <Box>
                    {/*<Paper className={classes.announcement}>*/}
                    {/*    <Typography variant="body1">*/}
                    {/*        Announcement, not always present, this day in latin history, roman holiday, link to wikipedia, medieval scientific research, featured content, contains emojis🐋😤💯👀*/}
                    {/*    </Typography>*/}
                    {/*</Paper>*/}
                    <img src={logo} alt="Logo" height={500}/>
                </Box>
            </Fade>

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