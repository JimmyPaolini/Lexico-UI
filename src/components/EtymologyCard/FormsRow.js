import React, { useState, useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import VerbForms from "./PartsOfSpeech/VerbForms";
import NounForms from "./PartsOfSpeech/NounForms";
import AdjectiveForms from "./PartsOfSpeech/AdjectiveForms";
const formNameAbbreviations = require("../../formAbbreviations.json");

export default function FormsRow({searched, forms, partOfSpeech}) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded);
    let searchedForms = [];
    try {
        searchedForms = getSearchedForms(searched, forms, [], searchedForms);
    } catch(e) {}

    useEffect(() => {
        if (!window.location.pathname.match(/^\/search/)) return;
        const toggleExpandedKeybind = e => {
            if (e.key === "f" && document.activeElement.tagName !== "INPUT") toggleExpanded();
        }
        window.addEventListener("keypress", toggleExpandedKeybind);
        return () => window.removeEventListener("keypress", toggleExpandedKeybind);
    });

    if (!searched) searched = partOfSpeech === "verb" ? "Conjugation" : "Declension";

    const FormsCard = !forms ? null : {
        "verb": VerbForms,
        "noun": NounForms,
        "proper noun": NounForms,
        "adjective": AdjectiveForms,
        "participle": AdjectiveForms,
        "pronoun": AdjectiveForms,
    }[partOfSpeech];

    return (<>
        <CardContent className={classes.formsRow}>
            <Grid container direction="row" justify="space-evenly">
                <Grid container item direction="column" justify="center" xs={true}>
                    <Typography variant="body1">{searched}</Typography>
                    {searchedForms.map(searchedForm => (
                        <Typography variant="button" className={classes.searchedForm} key={searchedForm}>
                            {searchedForm}
                        </Typography>
                    ))}
                </Grid>
                {FormsCard &&
                    <Grid item>
                        <IconButton onClick={toggleExpanded} disableRipple aria-label="expand forms">
                            <KeyboardArrowDownIcon className={expanded ? classes.upSideDown : classes.rightSideUp}/>
                        </IconButton>
                    </Grid>
                }
            </Grid>
        </CardContent>
        {FormsCard &&
            <Collapse in={expanded && !!FormsCard}>
                <Divider variant="inset"/>
                <FormsCard forms={forms}/>
            </Collapse>
        }
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
    formsRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    rightSideUp: {
        transition: "250ms ease",
        transform: "rotateZ(0deg)",
    },
    upSideDown: {
        transition: "250ms ease",
        transform: "rotateZ(-180deg)",
    },
}));