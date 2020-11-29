import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import PrincipalPartsRow from "./PrincipalPartsRow";
import TranslationsRow from "./TranslationsRow";
import FormsRow from "./FormsRow";

export default function EtymologyCard({etymology, searched=""}) {
    const classes = useStyles();
    return (
        <Card elevation={4} className={classes.etymologyCard}>
            <PrincipalPartsRow etymology={etymology}/>
            <Divider variant="inset"/>
            <TranslationsRow translations={etymology.translations}/>
            <FormsRow partOfSpeech={etymology.partOfSpeech} forms={etymology.forms} searched={searched}/>
        </Card>
    )
}

export const width = 382;
const useStyles = makeStyles(theme => ({
    etymologyCard: {
        width,
        display: "inline-block",
        paddingBottom: theme.spacing(0),
    }
}));