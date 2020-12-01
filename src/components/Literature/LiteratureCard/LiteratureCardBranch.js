import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LiteratureCardLeaf from "./LiteratureCardLeaf";
import { sentenceCase, romanNumeralize } from "../../../globals";

export default function LiteratureCardBranch({ item, level, parentTitle }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(!!item.expaned);

    const variant = ["h4", "h5", "h6", "body1"][level];
    item.children.sort((a, b) => {
        if (a.children && !b.children) return -1;
        if (!a.children && b.children) return 1;
        return a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' });
    });
    return (<>
        <CardActionArea onClick={() => setExpanded(!expanded)}>
            <CardHeader
                title={romanNumeralize(sentenceCase(item.title))}
                titleTypographyProps={{ variant }}
                subheader={romanNumeralize(sentenceCase(item.subtitle))}
                className={classes.literatureCardHeader}
                action={<ExpandMoreIcon
                    className={clsx(classes.icon, classes.transition,
                        expanded ? classes.contractButton : classes.expandButton)}
                />}
                style={{ paddingLeft: (level + 1) * 16 }}
            />
            <CardContent className={classes.childrenSummary} style={{ paddingLeft: (level + 1) * 16 }}>
                <Typography variant="body2">
                    {item.children.every(child => child.title.match(/book \d+/))
                        ? `Books ${romanNumeralize(item.children[0].title.match(/\d+/)[0])}-${romanNumeralize(item.children.slice(-1)[0].title.match(/\d+/)[0])}`
                        : item.children.map(child => romanNumeralize(sentenceCase(child.title))).join(" • ")}
                </Typography>
            </CardContent>
        </CardActionArea>
        <Collapse in={expanded}>
            {item.children.map(child => (
                <Box key={JSON.stringify(child)}>
                    <Divider variant="middle" />
                    <CardContent className={classes.literatureCardContent} key={child.title + "-" + item.title} style={{ padding: 0 }}>
                        {child.children
                            ? <LiteratureCardBranch item={child} level={level + 1} parentTitle={item.title} />
                            : <LiteratureCardLeaf item={child} level={level + 1} parentTitle={item.title} />
                        }
                    </CardContent>
                </Box>
            ))}
        </Collapse>
    </>);
}

const useStyles = makeStyles(theme => ({
    literatureCardHeader: {
        paddingBottom: 0,
    },
    literatureCardContent: {
        padding: 0,
    },
    childrenSummary: {
        paddingTop: theme.spacing(1) / 2,
        paddingBottom: theme.spacing(1),
    },
    transition: {
        transition: theme.transitions.create("all", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandButton: {
        transform: "rotate(0deg)"
    },
    contractButton: {
        transform: "rotate(180deg)"
    },
    icon: {
        margin: theme.spacing(1),
    }
}));