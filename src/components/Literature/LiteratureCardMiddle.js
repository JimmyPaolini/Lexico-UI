import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { sentenceCase, decimalToRoman } from "../../globals";

export default function LiteratureCard({name, author, object}) {
    const classes = useStyles();
    const title = sentenceCase(name.replace(/\.txt/, '')).replace(/\d+/g, d => decimalToRoman(d));
    
    return (
        <Card elevation={4} className={classes.literatureCard}>
            <CardActionArea>
                <CardHeader
                    title={title}
                    subheader={sentenceCase(author || object.author || "")}
                    className={classes.literatureCardHeader}
                    style={{paddingBottom: typeof object === "object" ? 0 : 16}}
                />
                {typeof object === "object" &&
                    <CardContent>
                        <Typography variant="body2" component="p" align="center">
                            {object.children.map(child => 
                                sentenceCase(child.replace(/\.txt/, '')).replace(/\d+/g, d => decimalToRoman(d))
                            ).join(" • ")}
                        </Typography>
                    </CardContent>
                }
            </CardActionArea>
        </Card>
    )
}

const useStyles = makeStyles(theme => ({
    literatureCard: {
        display: "inline-block",
        width: 382,
        fontFamily: theme.typography.fontFamily,
    },
    literatureCardHeader: {
        textAlign: "center",
        paddingBottom: theme.spacing(0),
    },
}));