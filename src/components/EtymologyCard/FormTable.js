import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core/styles";
import FormCell from "./FormCell";

export default function FormTable({forms}) {
    const classes = useStyles();
    const fontSize = forms.some(form => form.center && form.center.length > 14) ? 14 : 16
    return (
        <Paper className={classes.paper} elevation={0}>
            {forms.map((form, i) => {
                const horizontal = i < 2 ? "top" : i >= forms.length - 2 ? "bottom" : "mid";
                const vertical = i % 2 ? "Right" : "Left";
                const position = horizontal + vertical;
                return <FormCell center={form.center}
                                 position={position}
                                 topLeft={form.topLeft}
                                 topRight={form.topRight}
                                 bottomLeft={form.bottomLeft}
                                 bottomRiight={form.bottomRight}
                                 fontSize={fontSize}
                />
            })}
        </Paper>
    );
}

FormTable.propTypes = {
    forms: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const useStyles = makeStyles(theme => ({
    paper: {
        borderRadius: 0,
        display: "flex",
        flexWrap: "wrap"
    }
}));
