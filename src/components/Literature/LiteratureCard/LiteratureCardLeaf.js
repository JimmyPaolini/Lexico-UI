import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { sentenceCase, romanNumeralize } from "../../../globals";
const format = text => romanNumeralize(sentenceCase(text));

export default function LiteratureCardLeaf({ item, level, parentTitle }) {
    const classes = useStyles();
    const history = useHistory();
    const variant = ["h4", "h5", "h6", "body1"][level];
    item.title = item.title.replace(/\.txt/, '');

    return (
        <CardActionArea onClick={() => history.push("literature/" + item.key)}>
            <CardHeader
                title={format(item.title)}
                titleTypographyProps={{ variant }}
                subheader={format(parentTitle)}
                className={classes.literatureCardHeader}
                style={{ paddingLeft: (level + 1) * 16, paddingBottom: 8, paddingTop: 8 }}
                action={<OpenInNewIcon className={classes.icon} />}
            />
        </CardActionArea>
    );
}

const useStyles = makeStyles(theme => ({
    literatureCardHeader: {
        paddingBottom: 0,
    },
    icon: {
        margin: theme.spacing(1),
    }
}));