import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PrincipalPartsRow from "./PrincipalPartsRow";
import TranslationsRow from "./TranslationsRow";
import FormsRow from "./FormsRow";

export default function EtymologyCard({etymology, nonlemmaForms}) {
    const classes = useStyles();
    return (
        <Paper elevation={8} className={classes.paper}>
            <PrincipalPartsRow principalParts={etymology.principalParts}/>
            <TranslationsRow translations={etymology.translations}/>
            <FormsRow partOfSpeech={etymology.partOfSpeech} forms={etymology.forms} nonlemmaForms={nonlemmaForms}/>
        </Paper>
    )
}

const width = 382;
const useStyles = makeStyles(theme => ({
    paper: {
        width,
        display: "inline-block"
    }
}));