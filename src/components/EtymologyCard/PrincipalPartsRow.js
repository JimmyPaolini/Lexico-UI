import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import {isBookmarked, createBookmark, deleteBookmark} from "../Bookmarks/BookmarksController";
import {getId} from "../../globals";

export default function PrincipalPartsRow({etymology}) {
    const classes = useStyles();
    const principalPartsRestructured = getId(etymology);

    const [bookmarked, setBookmarked] = useState(isBookmarked(etymology));
    const toggleBookmark = () => {
        if (bookmarked) deleteBookmark(etymology);
        else createBookmark(etymology);
        setBookmarked(!bookmarked);
    }
    return (
        <CardHeader 
            title={principalPartsRestructured}
            titleTypographyProps={{variant: "subtitle1"}}
            subheader={`${etymology.partOfSpeech}, ${etymology.inflection}`}
            subheaderTypographyProps={{variant: "subtitle2"}}
            className={classes.principalPartsRow}
            aria-label="Principal Parts and Inflection"
            action={
                <IconButton onClick={toggleBookmark} className={classes.bookmark} aria-label="Bookmark">
                    {bookmarked ? <BookmarkIcon/> : <BookmarkBorderIcon/>}
                </IconButton>
            }
        />
    )
}

const useStyles = makeStyles(theme => ({
    principalPartsRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    bookmark: {
        display: "inline-block",
        position: "relative",
        top: 8
    }
}));