import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { sentenceCase, romanNumeralize } from "../../globals";

export default function LiteratureCard({author}) {
    const classes = useStyles();
    
    return (
        <Card elevation={4} className={classes.literatureCard}>
            <LiteratureCardChildren item={author} level={0}/>
        </Card>
    )
}

function LiteratureCardChildren({item, level, parentTitle}) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(!!item.expaned);
    
    const variant = ["h4", "h5", "h6", "body1"][level];
    if (item.children) {
        item.children.sort((a, b) => {
            if (a.children && !b.children) return -1;
            if (!a.children && b.children) return 1;
            return a.title.localeCompare(b.title, undefined, {numeric: true, sensitivity: 'base'});
        });
        return (<>
            <CardActionArea onClick={() => setExpanded(!expanded)}>
                <CardHeader
                    title={romanNumeralize(sentenceCase(item.title))}
                    titleTypographyProps={{variant}}
                    subheader={romanNumeralize(sentenceCase(item.subtitle))}
                    className={classes.literatureCardHeader}
                />
                <CardContent className={classes.childrenSummary}>
                    <Typography variant="body2" align="center">
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
                        <CardContent className={classes.literatureCardContent} key={child.title + "-" + item.title}>
                            <LiteratureCardChildren item={child} level={level+1} parentTitle={item.title}/>
                        </CardContent>
                    </Box>
                ))}
            </Collapse>
        </>);

    } else {
        item.title = item.title.replace(/\.txt/, '');
        return (
            <CardActionArea>
                <CardHeader
                    title={romanNumeralize(sentenceCase(item.title))}
                    titleTypographyProps={{variant}}
                    subheader={romanNumeralize(sentenceCase(parentTitle))}
                    className={classes.literatureCardHeader}
                    style={{paddingBottom: 16}}
                />
            </CardActionArea>
        );
    }
}

const useStyles = makeStyles(theme => ({
    literatureCard: {
        display: "inline-block",
        width: theme.custom.cardWidth,
        fontFamily: theme.typography.fontFamily,
        padding: 0,
    },
    literatureCardHeader: {
        textAlign: "center",
        paddingBottom: 0,
    },
    literatureCardContent: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    childrenSummary: {
        paddingTop: theme.spacing(1) / 2,
        paddingBottom: theme.spacing(1),
    },
}));