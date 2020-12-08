import { Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"

export default function LiteratureWord({ word, openModal }) {
  const classes = useStyles()

  return (
    <Box
      onClick={() => openModal(word.replace(/\W/g, ""))}
      className={classes.literatureWord}
    >
      {word + " "}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  literatureWord: {
    display: "inline",
    cursor: "pointer",
  },
}))
