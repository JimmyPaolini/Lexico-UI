import React, { useState } from 'react';
import useEventListener from "../../useEventListener";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

export default function TranslationsRow({translations}) {
    translations = translations.filter(translation => !!translation);
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const expandable = translations.length > 2;

    useEventListener('keypress', (e) => {
        if (window.location.pathname.match(/^\/bookmarks/)) return;
        if (e.key === "t" && document.activeElement.tagName !== "INPUT") setExpanded(!expanded);
    });

    const Translation = CreateTranslation(classes);

    return (
        <Accordion 
            expanded={expandable && expanded} 
            onClick={() => setExpanded(!expanded)} 
            className={classes.accordion}
            elevation={0} square>
            <AccordionSummary 
                expandIcon={expandable ? <ExpandMoreIcon /> : undefined} 
                {...(!expandable ? {style: {cursor: "default"}} : {})}
                className={classes.accordionSummary}>
                <Grid container direction="column" justfy="center">
                    {translations.slice(0, 2).map((translation) => Translation(translation))}
                </Grid>
            </AccordionSummary>
            {expandable && <AccordionDetails className={classes.accordionDetails}>
                <Grid container direction="column" justfy="center">
                    {translations.slice(2).map((translation) => Translation(translation))}
                </Grid>
            </AccordionDetails>}
        </Accordion>
    );
}

const CreateTranslation = classes => (translation) => (
    <Grid container item spacing={1} wrap="nowrap" key={translation}>
        <Grid item>
            <FiberManualRecordIcon className={classes.bullet}/>
        </Grid>
        <Grid item>
            <Typography color="textPrimary">{translation}</Typography>
        </Grid>
    </Grid>
);

const Accordion = withStyles((theme) => ({
    root: {
        '&:before': {
            display: 'none',
            color: theme.palette.primary.contrastText,
        },
    },
    expanded: {
        '&$expanded': {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    },
    // disabled: {
    //     color: theme.palette.primary.contrastText,
    //     '&$disabled': {
    //         backgroundColor: theme.palette.grey[800],
    //         color: theme.palette.primary.contrastText,
    //         opacity: 1
    //     },
    // },
  }))(MuiAccordion);
  
const AccordionSummary = withStyles((theme) => ({
    root: {
        minHeight: 0,
        '&$expanded': {
            minHeight: 0,
            maxHeight: "none",
        },
    },
    content: {
        margin: 0,
        '&$expanded': {
            margin: 0
        },
    },
    expanded: {
        '&$expanded': {
            maxHeight: "none",
        },
    },
    disabled: {
        '&$disabled': {
            backgroundColor: "inherit",
        },
    },
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
    bullet: {
        position: "relative",
        top: 4,
        fontSize: 12,
        color: theme.palette.text.primary,
    },
    accordion: {
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    accordionSummary: {
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
    },
    accordionDetails: {
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
    },
}));