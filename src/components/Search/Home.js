import Box from "@material-ui/core/Box"
import Grow from "@material-ui/core/Grow"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { useContext, useRef, useState } from "react"
import { Context } from "../../App"

export default function Home() {
  const classes = useStyles()
  const ref = useRef()
  const { Logo } = useContext(Context)
  const [announcementIn, setAnnouncementIn] = useState(false)
  const announcement = `Announcement, not always present, this day in latin history, roman holiday, link to <a href="https://www.wikipedia.org/">wikipedia</a>, medieval scientific research, featured content, contains emojis🐋😤💯👀`
  if (ref.current) ref.current.innerHTML = announcement

  return (
    <Box position="relative">
      <Grow in appear onEntered={() => setAnnouncementIn(true)}>
        <Box>
          <Logo />
        </Box>
      </Grow>
      <Grow in={!!announcement && announcementIn} appear>
        <Typography
          ref={ref}
          variant="body1"
          align="center"
          className={classes.announcement}
        />
      </Grow>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  announcement: {
    width: 236,
    position: "absolute",
    right: 32,
    top: 64,
  },
}))
