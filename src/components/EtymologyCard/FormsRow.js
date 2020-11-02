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

export default function FormsRow({search, forms, partOfSpeech}) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded);
    const searchedForms = searchForms(search, forms, [], []);

    const FormsCard = {
        "verb": VerbForms,
        "noun": NounForms,
        "proper noun": NounForms,
        "adjective": AdjectiveForms,
        "participle": AdjectiveForms,
        "adverb": AdjectiveForms,
    }[partOfSpeech];
    return (
        <Paper className={classes.paper} elevation={0}>
            <Box className={classes.expandButton}>
                <IconButton aria-label="expand" onClick={toggleExpanded}>
                    {expanded ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </IconButton>
            </Box>
            <List dense className={classes.formsList}>
                {searchedForms.map(searchedForm => (
                    <ListItem className={classes.formsListItem}>
                        <ListItemText
                            secondary={searchedForm}
                            secondaryTypographyProps={{variant: "overline"}}
                        />
                    </ListItem>
                ))}
            </List>
            <Divider variant="inset"/>
            <Collapse in={expanded}>
                <FormsCard forms={forms}/>
            </Collapse>
        </Paper>
    )
}

const formNameAbbreviations = {
    "nominative": "NOM",
    "genitive": "GEN",
    "dative": "DAT",
    "accusative": "ACC",
    "ablative": "ABL",
    "vocative": "VOC",
    "locative": "LOC",

    "masculine": "MASC",
    "feminine": "FEM",
    "neuter": "NEU",

    "singular": "SG",
    "plural": "PL",

    "indicative": "IND",
    "subjunctive": "SUB",
    "imperative": "IMP",
    "infinitive": "INFF",
    "non finite": "NONF",

    "present": "PRES",
    "imperfect": "IMP",
    "future": "FUT",
    "perfect": "PERF",
    "pluperfect": "PLUP",
    "future perfect": "FUTP",

    "active": "ACT",
    "passive": "PAS",

    "first": "1ST",
    "second": "2ND",
    "third": "3RD",
}

const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g,"");

function searchForms(search, forms, currentForm, searchedForms) {
    if (Array.isArray(forms)) {
        if (forms.some(form => normalize(form).match(new RegExp("^" + search + "$", "i")))) {
            return [...searchedForms, currentForm.join(" ")];
        }
    } else { 
        for (const key in forms) {
            searchedForms = searchForms(search, forms[key], [...currentForm, key], searchedForms);
        }
    }
    return searchedForms;
}

FormsRow.propTypes = {
    search: PropTypes.string.isRequired,
    forms: PropTypes.object.isRequired,
    partOfSpeech: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
    paper: {
        borderRadius: 0,
    },
    formsList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: 40
    },
    formsListItem: {
        height: 16,
        lineHeight: 16
    },
    expandButton: {
        display: "inline-block",
        position: "relative",
        float: "right",
        top: "4px",
        right: "4px"
    },
}));