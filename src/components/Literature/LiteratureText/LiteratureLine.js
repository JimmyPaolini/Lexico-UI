import { Grid, Typography } from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import React from "react"
import LazyLoad from "react-lazy-load"
import LiteratureWord from "./LiteratureWord"

export default function LiteratureLine({ words, lineNumber, openModal }) {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Grid item container wrap="nowrap">
      <Typography
        variant="inherit"
        align="right"
        className={classes.lineNumber}
      >
        {lineNumber}
      </Typography>

      <LazyLoad offset={theme.spacing(96)}>
        <Typography variant="inherit">
          {words.map((word, i) => (
            <LiteratureWord word={word} openModal={openModal} key={word + i} />
          ))}
        </Typography>
      </LazyLoad>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  lineNumber: {
    minWidth: theme.spacing(6),
    marginRight: theme.spacing(2),
    pointerEvents: "none",
    userSelect: "none",
  },
}))
