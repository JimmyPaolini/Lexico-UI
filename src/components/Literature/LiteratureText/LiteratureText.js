import { Box, Grid } from "@material-ui/core"
import React from "react"
import LiteratureLine from "./LiteratureLine"

export default function LiteratureText({ lines, openModal }) {
  return (
    <Box>
      <Grid item container direction="column" justify="center">
        {lines.map((words, lineNumber) => (
          <LiteratureLine
            {...{ words, lineNumber, openModal }}
            key={JSON.stringify(words + lineNumber)}
          />
        ))}
      </Grid>
    </Box>
  )
}
