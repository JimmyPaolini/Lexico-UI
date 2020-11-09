import React, { useState, useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from "@material-ui/core/IconButton";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowUp';

export default function TranslationsRow({translations}) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const expandable = translations.length > 2;
    const toggleExpanded = () => {
        setExpanded(expanded => !expanded);
    }

    useEffect(() => {
        if (!window.location.pathname.match(/^\/search/)) return;
        const toggleExpandedKeybind = e => {
            if (e.key === "t" && document.activeElement.tagName !== "INPUT") toggleExpanded();
        }
        window.addEventListener("keypress", toggleExpandedKeybind);
        return () => window.removeEventListener("keypress", toggleExpandedKeybind);
    });

    const Translation = CreateTranslation(classes);

    return (
        <CardContent className={classes.translationsRow}>
            <Grid container direction="row" justify="space-evenly">
                <Grid container item direction="column" xs={expandable}>
                    {translations.slice(0, 2).map(translation => Translation(translation))}
                    <Collapse in={expanded || !expandable} timeout={300}>
                        {translations.slice(2).map((translation, i) => Translation(translation))}
                    </Collapse>
                </Grid>
                {expandable && 
                    <Grid item>
                        <IconButton onClick={toggleExpanded} disableRipple aria-label="expand translations">
                            <KeyboardArrowDownIcon className={expanded ? classes.upSideDown : classes.rightSideUp}/>
                        </IconButton>
                    </Grid>
                }
            </Grid>
        </CardContent>
    )
}

const CreateTranslation = classes => translation => (
    <Grid container item spacing={1} wrap="nowrap">
        <Grid item>
            <FiberManualRecordIcon fontSize="small" className={classes.bullet}/>
        </Grid>
        <Grid item>
            <Typography>{translation}</Typography>
        </Grid>
    </Grid>
);

const useStyles = makeStyles(theme => ({
    translationsRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    bullet: {
        position: "relative",
        top: 2,
    },
    rightSideUp: {
        transition: "300ms ease",
        transform: "rotateZ(0deg)"
    },
    upSideDown: {
        transition: "300ms ease",
        transform: "rotateZ(-180deg)"
    },
}));