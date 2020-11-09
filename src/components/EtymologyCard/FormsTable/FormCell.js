import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';

export default function FormCell({center="", position, topLeft, topRight, bottomLeft, bottomRight}) {
    const classes = useStyles();
    const fontSize = Math.max(Math.min(18 - center.length/4, 18), 14);
    const centerRef = useRef();
    const [overflow, setOverflow] = useState(false);
    useEffect(() => {
        if (centerRef.current.scrollHeight > centerRef.current.offsetHeight) {
            const characters = centerRef.current.innerHTML.split("");
            while (centerRef.current.scrollHeight > centerRef.current.offsetHeight) {
                characters.pop();
                centerRef.current.innerHTML = characters.join("") + '...';
            }
            setOverflow(true);
        }
    }, []);

    const CornerCaptionText = ({text}) => {
        return (
            <Grid item>
                <Typography variant="caption">
                    {text}
                </Typography>
            </Grid>
        )
    }
    const Dividers = () => (<>
        {position.match(/top/i) 
            ? <Divider className={classes.bottomDivider} absolute />
            : <Divider className={classes.topDivider} absolute />
        }
        {position.match(/bottom/i) 
            ? <Divider className={classes.topDivider} absolute />
            : <Divider className={classes.bottomDivider} absolute />
        }
        <Divider orientation="vertical" className={position.match(/left/i) ? classes.rightDivider : classes.leftDivider} />
    </>);

    return (
        <Tooltip 
            title={overflow ? center : ""} 
            placement="top" 
            enterDelay={0} 
            interactive 
            arrow 
            classes={{tooltip: classes.tooltip}} 
            aria-label={center}
        >
            <Grid container justify="space-between" className={classes.formCell} wrap="nowrap">
                <Grid container item direction="column" justify="space-between" alignItems="flex-start" className={classes.left}>
                    <CornerCaptionText text={topLeft}/>
                    <CornerCaptionText text={bottomLeft}/>
                </Grid>
                <Grid container item style={{flexGrow: 1}} justify="center" alignItems="center" >
                    <Typography style={{fontSize}} className={classes.center} ref={centerRef}>
                        {center || "-"}
                    </Typography>
                </Grid>
                <Grid container item direction="column" justify="space-between" alignItems="flex-end" className={classes.right}>
                    <CornerCaptionText text={topRight}/>
                    <CornerCaptionText text={bottomRight}/>
                </Grid>
                <Dividers />
            </Grid>
        </Tooltip>
    );
}

const useStyles = makeStyles(theme => ({
    formCell: {
        position: "relative",
        height: 48,
        width: 191,
        background: theme.palette.background.paper,
    },
    tooltip: {
        maxWidth: 160,
        fontSize: 16,
        textAlign: "center"
    },
    center: {
        maxHeight: 48,
        maxWidth: 191,
        textAlign: "center",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "pre",
    },
    left: {
        position: "relative",
        left: 4,
    },
    right: {
        position: "relative",
        right: 4,
    },
    ...["top", "bottom", "left", "right"].reduce((dividers, edge) => (
        {
            ...dividers,
            [edge + "Divider"]: {
                position: "absolute",
                [edge]: 0,
            }
        }
), {})
}));
