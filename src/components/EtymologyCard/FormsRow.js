import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import VerbCard from "./VerbCard";
import NounCard from "./NounCard";
import AdjectiveCard from "./AdjectiveCard";
import PropTypes from "prop-types";

const posMap = {
    "verb": VerbCard,
    "noun": NounCard,
    "proper noun": NounCard,
    "adjective": AdjectiveCard,
    "participle": AdjectiveCard,
    "adverb": AdjectiveCard,
}

export default function FormsRow({nonlemmaForms, forms, partOfSpeech}) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded);

    const FormsCard = posMap[partOfSpeech];
    return (
        <Paper className={classes.paper} elevation={0}>
            <List dense className={classes.translationsList}>
                <ListItem>
                    <ListItemText
                        secondary={nonlemmaForms}
                        // secondaryTypographyProps={{variant: "subtitle1"}}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments" onClick={toggleExpanded}>
                            {expanded ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            <Divider variant="inset"/>
            {expanded && <FormsCard forms={forms}/>}
        </Paper>
    )
}

FormsRow.propTypes = {
    principalParts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    searchResults: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    bookmarked: PropTypes.bool.isRequired,
};

const useStyles = makeStyles(theme => ({
    paper: {
        borderRadius: 0,
    },
    translationsList: {
        // padding: "14px 20px 13px 20px"
    }
}));