import React, { useState } from 'react';
import useEventListener from "../../useEventListener";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VerbForms from "./PartsOfSpeech/VerbForms";
import NounForms from "./PartsOfSpeech/NounForms";
import AdjectiveForms from "./PartsOfSpeech/AdjectiveForms";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

const Accordion = withStyles((theme) => ({
    root: {
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    disabled: {
        '&$disabled': {
            backgroundColor: theme.palette.grey[800],
            textColor: theme.palette.text.primary,
        },
    },
    expanded: {},
}))(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: 0
    }
}))(MuiAccordionDetails);

const formNameAbbreviations = require("../../formAbbreviations.json");

export default function FormsRow({searched, forms, partOfSpeech}) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    let searchedForms = [];
    try {
        searchedForms = getSearchedForms(searched, forms, [], searchedForms);
    } catch(e) {}

    useEventListener('keypress', (e) => {
        if (window.location.pathname.match(/^\/bookmarks/)) return;
        if (e.key === "f" && document.activeElement.tagName !== "INPUT") setExpanded(!expanded);
    });

    if (!searched) searched = partOfSpeech === "verb" ? "Conjugation Table" : "Declension Table";

    const FormsCard = !forms ? null : {
        "verb": VerbForms,
        "noun": NounForms,
        "proper noun": NounForms,
        "adjective": AdjectiveForms,
        "participle": AdjectiveForms,
        "pronoun": AdjectiveForms,
    }[partOfSpeech];

    const expandable = !!FormsCard;

    if (searched.match(/Table/i) && !expandable) return null;

    return (<>
        <Divider variant="inset"/>
        <Accordion 
            expanded={expanded} 
            onClick={() => setExpanded(!expanded)} 
            disabled={!expandable}
            className={classes.accordion} 
            elevation={0} square>
            <AccordionSummary expandIcon={expandable ? <ExpandMoreIcon /> : undefined} className={classes.accordion}>
                <Grid container direction="column" justfy="center">
                    <Grid item>
                        <Typography variant="body1">{searched}</Typography>
                    </Grid>
                    {searchedForms.map(searchedForm => (
                        <Grid item>
                            <Typography variant="button" className={classes.searchedForm} key={searchedForm}>
                                {searchedForm}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </AccordionSummary>
            {expandable && <AccordionDetails>
                <Divider variant="inset" absolute/>
                <FormsCard forms={forms}/>
            </AccordionDetails>}
        </Accordion>
    </>);
}

const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g,"");

function getSearchedForms(searched, forms, currentForm, searchedForms) {
    if (Array.isArray(forms)) {
        if (forms.some(form => normalize(form).match(new RegExp("^" + searched + "$", "i")))) {
            return [...searchedForms, currentForm.join(" ")];
        }
    } else {
        for (const key in forms) {
            searchedForms = getSearchedForms(searched, forms[key], [...currentForm, formNameAbbreviations[key]], searchedForms);
        }
    }
    return searchedForms;
}

const useStyles = makeStyles(theme => ({
    accordion: {
        minHeight: 64,
    },
}));