import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import FormCell from "./FormCell";

export default function FormsTable({forms}) {
    const classes = useStyles();
    return (
        <Grid container className={classes.formsTable}>
            {forms.map((form, i) => {
                const horizontal = i < 2 ? "top" : i >= forms.length - 2 ? "bottom" : "mid";
                const vertical = i % 2 ? "Right" : "Left";
                const position = horizontal + vertical;
                return (
                    <Grid item xs={6}>
                        <FormCell 
                            position={position}
                            center={form.center}
                            topLeft={form.topLeft}
                            topRight={form.topRight}
                            bottomLeft={form.bottomLeft}
                            bottomRiight={form.bottomRight}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
}

FormsTable.propTypes = {
    forms: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const useStyles = makeStyles(theme => ({
    formsTable: {
        background: theme.palette.background.paper
    }
}));
