import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export default function FormCell({center, position, topLeft, topRight, bottomLeft, bottomRight, fontSize}) {
    const classes = useStyles();
    // fontSize = center && center.length > 14 ? 14 : 16 // This determines fontSize for every cell
    return (
        <Paper className={classes.paper} elevation={0}>
            <Typography className={classes.center} style={{fontSize}}>{center || "-"}</Typography>

            <Typography className={classes.topLeft}    >{topLeft    }</Typography>
            <Typography className={classes.topRight}   >{topRight   }</Typography>
            <Typography className={classes.bottomLeft} >{bottomLeft }</Typography>
            <Typography className={classes.bottomRight}>{bottomRight}</Typography>

            {position.match(/mid/i) ?
                <>
                    <Divider className={classes.bottomDivider} absolute />
                    <Divider className={classes.topDivider}    absolute />
                </>
                : <Divider className={position.match(/top/i) ? classes.bottomDivider : classes.topDivider} absolute />
            }
            <Divider orientation="vertical" className={position.match(/left/i) ? classes.rightDivider : classes.leftDivider} />
        </Paper>
    );
}

FormCell.propTypes = {
    center: PropTypes.string.isRequired,
    position: PropTypes.oneOf([
        "topLeft", "topRight",
        "midLeft", "midRight",
        "bottomLeft", "bottomRight"
    ]).isRequired,
    topLeft: PropTypes.string,
    topRight: PropTypes.string,
    bottomLeft: PropTypes.string,
    bottomRight: PropTypes.string,
    fontSize: PropTypes.number,
};

const useStyles = makeStyles(theme => ({
    paper: {
        position: "relative",
        width: "50%",
        height: "48px",
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.primary.contrastText,
        borderRadius: 0,
    },
    center: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        fontSize: 24,
        textAlign: "center",
    },
    topLeft: {
        position: "absolute",
        top: "2px",
        left: "4px",
        fontSize: 14,
    },
    topRight: {
        position: "absolute",
        top: "2px",
        right: "4px",
        fontSize: 14,
    },
    bottomLeft: {
        position: "absolute",
        bottom: "2px",
        left: "4px",
        fontSize: 14,
    },
    bottomRight: {
        position: "absolute",
        bottom: "2px",
        right: "4px",
        fontSize: 14,
    },

    topDivider: {
        position: "absolute",
        top: 0,
    },
    bottomDivider: {
        position: "absolute",
        bottom: 0,
    },
    leftDivider: {
        position: "absolute",
        left: "0px",
    },
    rightDivider: {
        position: "absolute",
        right: "0px",
    },
}));
