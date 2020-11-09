import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
// import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const sampleSuggestions = [
    "Submit a word to be added to the Dictionary",
    "Suggest edits to translations, spellings, et cetera",
    "Request a text be added to the Literature section",
    "Send in a transcribed Latin recording to help develop Lexico’s speech recognition",
    "Leave the developer a note or donation!"
];

export default function Suggestions() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const send = () => {
        console.log(email, subject, message)
    }

    const textFieldOptions = {
        variant: "outlined",
        color: "secondary",
        required: true,
        className: classes.textField
    }

    return (
        <Grid container justify="center" alignItems="center">
            <Card className={classes.card}>
                <Typography variant="h4" className={classes.body}>
                    Suggestions
                </Typography>
                <TextField {...textFieldOptions}
                    label="Your Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField {...textFieldOptions}
                    label="Subject"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                />
                <TextField {...textFieldOptions}
                    label="Message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    multiline
                    rows={4}
                />
                <Box display="flex" justifyContent="center" >
                    <Button variant="contained" color="secondary" disableElevation onClick={send}>
                        Send
                    </Button>
                </Box>
                <Typography variant="subtitle1">
                    Use Suggestions to:
                </Typography>
                <List dense className={classes.list}>
                    {sampleSuggestions.map((text, i) => (
                        <ListItem key={i} style={{padding: 0}}>
                            <ListItemIcon>
                                <FiberManualRecordIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body2" className={classes.bullet}>
                                    {text}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
                <Typography variant="body1">
                    To edit an entry yourself, just edit it on Wiktionary!
                    (All words, translations, and grammatical information are parsed weekly from Wiktionary and Wikipedia)
                </Typography>
            </Card>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
        width: "42%"
    },
    textField: {
        marginBottom: theme.spacing(4),
        width: "100%"
    },
    body: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    divider: {
        margin: theme.spacing(1),
    },
    list: {
        listStyleType: "circle",
        listStylePosition: "inside"
    },
    bullet: {
        position: "relative",
        right: 20,
    }
}));