import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PrincipalPartsRow from "./PrincipalPartsRow";
import TranslationsRow from "./TranslationsRow";
import VerbCard from "./VerbCard";
import NounCard from "./NounCard";
import AdjectiveCard from "./AdjectiveCard";

export default function EtymologyCard({etymology, searchResults, bookmarked}) {
    const classes = useStyles();
    let FormsCard = null;
    if (etymology.partOfSpeech === 'verb') FormsCard = VerbCard;
    if (etymology.partOfSpeech === 'noun') FormsCard = NounCard;
    if (etymology.partOfSpeech === 'adjective') FormsCard = AdjectiveCard;
    return (
        <Paper elevation={8} className={classes.paper}>
            <PrincipalPartsRow 
                principalParts={etymology.principalParts}
                searchResults={searchResults}
                bookmarked={bookmarked}
            />
            <TranslationsRow
                translations={etymology.translations}
            />
            <FormsCard
                forms={etymology.forms}
            />
        </Paper>
    )
}

const width = 382;
const useStyles = makeStyles(theme => ({
    paper: {
        width: `${width}px`,
    }
}));