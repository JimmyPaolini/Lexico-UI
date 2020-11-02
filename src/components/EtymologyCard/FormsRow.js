import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Collapse from '@material-ui/core/Collapse';
import VerbForms from "./VerbForms";
import NounForms from "./NounForms";
import AdjectiveForms from "./AdjectiveForms";
import PropTypes from "prop-types";

const posMap = {
    "verb": VerbForms,
    "noun": NounForms,
    "proper noun": NounForms,
    "adjective": AdjectiveForms,
    "participle": AdjectiveForms,
    "adverb": AdjectiveForms,
}

const posFormsMap = {
    "verb": ["mood", "voice", "tense", "person", "number"],
    "noun": ["case", "number"],
    "proper noun": ["case", "number"],
    "adjective": ["gender", "case", "number"],
    "participle": ["gender", "case", "number"],
    "adverb": ["gender", "case", "number"],
}

export default function FormsRow({nonlemmaForms, forms, partOfSpeech}) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded);

    const FormsCard = posMap[partOfSpeech];
    return (
        <Paper className={classes.paper} elevation={0}>
            <List dense className={classes.formsList}>
                <ListItem>
                    <ListItemText
                        secondary={nonlemmaForms}
                        secondaryTypographyProps={{variant: "overline"}}
                    />
                </ListItem>
            </List>
            <Box className={classes.expandButton}>
                <IconButton aria-label="expand" onClick={toggleExpanded}>
                    {expanded ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </IconButton>
            </Box>
            <Divider variant="inset"/>
            <Collapse in={expanded}>
                <FormsCard forms={forms}/>
            </Collapse>
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
    formsList: {
        display: "inline-block",
        minHeight: 40
    },
    expandButton: {
        display: "inline-block",
        position: "relative",
        float: "right",
        top: "4px",
        right: "4px"
    },
}));