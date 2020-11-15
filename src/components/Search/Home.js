import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Context} from "../../App";

export default function Home({announcement}) {
    const classes = useStyles();
    const {Logo} = useContext(Context);

    return (<>
        <Grow in>
            <Box>
                <Logo />
            </Box>
        </Grow>
            {announcement && 
                <Paper className={classes.announcement}>
                    {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                    <Typography variant="body1">
                        Announcement, not always present, this day in latin history, roman holiday, link to wikipedia, medieval scientific research, featured content, contains emojis🐋😤💯👀
                    </Typography>
                </Paper>
            }
    </>);
}

const useStyles = makeStyles((theme) => ({
    announcement: {
        padding: theme.spacing(1),
        display: "block",
        // position: "absolute",
        // width: "20%",
        // left: "30%",
        // bottom: "70%"
    }
}));