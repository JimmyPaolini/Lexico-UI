import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PropTypes from "prop-types";

export default function PrincipalPartsRow({principalParts}) {
    const classes = useStyles();
    const principalPartsRestructured = principalParts.map(pp => pp.split(": ")[1].replace(" or ", "/")).join(", ");

    if (!window.localStorage.bookmarks) window.localStorage.bookmarks = "";
    const [bookmarked, setBookmarked] = useState(window.localStorage.bookmarks.match(new RegExp(principalPartsRestructured)));
    const toggleBookmark = () => {
        if (bookmarked) window.localStorage.bookmarks = window.localStorage.bookmarks.replace(`{${principalPartsRestructured}}`, '');
        else window.localStorage.bookmarks += `{${principalPartsRestructured}}`;
        setBookmarked(!bookmarked);
    }
    return (
        <Paper className={classes.paper} elevation={0}>
            <List dense className={classes.principalPartsList}>
                <ListItem>
                    <ListItemText
                        primary={principalPartsRestructured}
                        primaryTypographyProps={{variant: "subtitle1"}}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments" onClick={toggleBookmark}>
                            {bookmarked ? <BookmarkIcon/> : <BookmarkBorderIcon/>}
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            <Divider variant="inset"/>
        </Paper>
    )
}

PrincipalPartsRow.propTypes = {
    principalParts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    searchResults: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    bookmarked: PropTypes.bool.isRequired,
};

const useStyles = makeStyles(theme => ({
    paper: {
        borderRadius: 0,
    },
    principalPartsList: {
        // padding: "14px 20px 13px 20px"
    }
}));