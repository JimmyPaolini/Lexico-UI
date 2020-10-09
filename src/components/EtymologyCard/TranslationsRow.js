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

export default function TranslationsRow({translations}) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    let expanderNecessary = translations.length > 2
    if (expanderNecessary && !expanded) translations = translations.slice(0, 2);
    const toggleExpansion = () => {
        setExpanded(!expanded);
    }
    return (
        <Paper className={classes.paper} elevation={0}>
            <List dense className={classes.translationsList} style={{width: expanderNecessary ? "80%" :  "100%"}}>
                {translations.map((translation, i) => (
                    <ListItem id={i} className={classes.listItem}>
                        <ListItemIcon><FiberManualRecordIcon fontSize="small"/></ListItemIcon>
                        <ListItemText
                            primary={translation}
                            primaryTypographyProps={{variant: "body1"}}
                            className={classes.listItemText}
                        />
                    </ListItem>
                ))}
                {expanderNecessary && !expanded && (
                    <ListItem id={-1} style={{height: "16px"}}>
                        <ListItemIcon/>
                        <ListItemText primary="..."/>
                    </ListItem>
                )}
            </List>
            {expanderNecessary &&
                <Box className={classes.expandButton}>
                    <IconButton aria-label="expand" onClick={toggleExpansion}>
                        {expanded ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </Box>
            }
            <Divider variant="inset"/>
        </Paper>
    )
}

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