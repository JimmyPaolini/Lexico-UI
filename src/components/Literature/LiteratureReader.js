import { CircularProgress, Fade, Grid, Modal, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { useEffect, useMemo, useState } from "react"
import { getId } from "../../globals"
import CardDeck from "../CardDeck"
import EtymologyCard from "../EtymologyCard/EtymologyCard"
import LiteratureText from "./LiteratureText/LiteratureText"

export default function LiteratureReader({ textKey }) {
  const classes = useStyles()
  const [lines, setLines] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [cards, setCards] = useState([])

  useEffect(() => {
    const originalColor = document.body.style.backgroundColor
    document.body.style.backgroundColor = "black"
    return () => (document.body.style.backgroundColor = originalColor)
  })

  useEffect(() => {
    fetchLiterature(textKey).then((lines) =>
      setLines(lines.split("\n").map((line) => line.split(/\s/))),
    )
  }, [textKey])

  const openModal = (word) => {
    console.log("Open modal", word)
    setLoading(true)
    fetchLatin(word)
      .then((response) => {
        setCards(
          response.map((etymology) => ({
            key: getId(etymology),
            Card: () =>
              useMemo(
                () => <EtymologyCard etymology={etymology} searched={word} />,
                [],
              ),
          })),
        )
      })
      .catch(() => setCards([]))
      .finally(() => {
        setLoading(false)
        setOpen(true)
      })
  }

  const closeModal = () => {
    setOpen(false)
    setCards([])
  }

  if (!lines.length)
    return (
      <Paper
        square
        elevation={0}
        className={classes.paper}
        style={{ height: "100%" }}
      />
    )
  return (
    <>
      <Fade in>
        <Paper square elevation={0} className={classes.paper}>
          <Grid container justify="center">
            <LiteratureText lines={lines} openModal={openModal} />
          </Grid>
        </Paper>
      </Fade>
      <Modal
        open={open}
        onClose={closeModal}
        className={classes.modal}
        closeAfterTransition
        disableAutoFocus
      >
        {cards.length ? (
          <CardDeck cards={cards} />
        ) : (
          <CircularProgress className={classes.spinner} />
        )}
      </Modal>
    </>
  )
}

async function fetchLiterature(key) {
  const url =
    "https://i9ic4m487l.execute-api.us-east-1.amazonaws.com/literature/" + key
  const response = await fetch(url).then((r) => r.text())
  return response
}

let controller = new AbortController()
const clearSignal = () => {
  controller.abort()
  controller = new AbortController()
  return controller.signal
}

async function fetchLatin(word) {
  const url =
    `https://i9ic4m487l.execute-api.us-east-1.amazonaws.com/latin?search=` +
    word
  return fetch(url, { signal: clearSignal() }).then((r) => r.json())
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    backgroundColor: "black",
    padding: theme.spacing(8),
    fontFamily: theme.typography.literature.fontFamily,
    fontWeight: theme.typography.literature.fontWeight,
    fontSize: theme.typography.literature.fontSize,
    fontHeight: theme.typography.literature.fontHeight,
    letterSpacing: theme.typography.literature.letterSpacing,
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    color: theme.palette.primary.contrastText,
  },
}))
