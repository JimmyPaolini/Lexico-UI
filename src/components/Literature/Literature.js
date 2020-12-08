import React from "react"
import { useLocation } from "react-router-dom"
import LiteratureLibrary from "./LiteratureLibrary"
import LiteratureReader from "./LiteratureReader"

export default function Literature() {
  const location = useLocation()
  if (location.pathname.match(/^\/literature$/)) {
    return <LiteratureLibrary />
  } else {
    return (
      <LiteratureReader
        textKey={location.pathname.replace(/^\/literature\//, "")}
      />
    )
  }
}
