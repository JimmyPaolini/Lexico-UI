import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Collapse from '@material-ui/core/Collapse';

export default function TranslationsRow({translations}) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const expanderNecessary = translations.length > 2;
    const toggleExpanded = () => {
        setExpanded(expanded => !expanded);
    }
    return (
        <Paper className={classes.paper} elevation={0}>
            <List dense className={classes.translationsList} style={{width: expanderNecessary ? "80%" :  "100%"}}>
                {translations.slice(0, 2).map((translation, i) => Translation(translation, i, classes))}
                <Collapse in={expanded || !expanderNecessary}>
                    {translations.slice(3).map((translation, i) => Translation(translation, i, classes))}
                </Collapse>
                {/* {expanderNecessary && !expanded && (
                    <ListItem id={-1} style={{height: "16px"}}>
                        <ListItemIcon/>
                        <ListItemText primary="..."/>
                    </ListItem>
                )} */}
            </List>
            {expanderNecessary &&
                <Box className={classes.expandButton}>
                    <IconButton aria-label="expand" onClick={toggleExpanded}>
                        {expanded ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </Box>
            }
            <Divider variant="inset"/>
        </Paper>
    )
}

const Translation = (translation, i, classes) => (
    <ListItem id={i} className={classes.listItem}>
        <ListItemIcon><FiberManualRecordIcon fontSize="small"/></ListItemIcon>
        <ListItemText
            primary={translation}
            primaryTypographyProps={{variant: "body1"}}
            className={classes.listItemText}
        />
    </ListItem>
);

const width = 382;
const useStyles = makeStyles(theme => ({
    paper: {
        width: `${width}px`,
        borderRadius: 0,
    },
    translationsList: {
        display: "inline-block",
    },
    expandButton: {
        display: "inline-block",
        position: "relative",
        float: "right",
        top: "4px",
        right: "4px"
    },
    listItem: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    listItemText: {
        position: "relative",
        right: 20
    }
}));