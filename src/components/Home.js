import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// import Fade from '@material-ui/core/Fade';
import logo from '../logo.png';

export default function Home() {
    const classes = useStyles();
    return (
        <Box>
            {/*<Paper className={classes.announcement}>*/}
            {/*    <Typography variant="body1">*/}
            {/*        Announcement, not always present, this day in latin history, roman holiday, link to wikipedia, medieval scientific research, featured content, contains emojis🐋😤💯👀*/}
            {/*    </Typography>*/}
            {/*</Paper>*/}
            <img src={logo} alt="Logo" height={500}/>
        </Box>
    );
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