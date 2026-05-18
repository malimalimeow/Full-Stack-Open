import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import country from "./services/country";
import Weather from "./components/Weather";
import {ShowFiltered, FilteredLine ,ShowTarget} from "./components/ShowCountry"

const App = () => {

  const [name, setName] = useState("")
  const [allCountryName, setAllName] = useState([])
  const [show, setShow] = useState("")
  const [targetName, setTarget] = useState("")
  const [targetCountry, setTargetCountry] = useState({})

  const target = (countryName) => {
    country.getOne(countryName)
      .then(countryDetail => {
        const country_name = countryDetail.name["common"]
        const country_capital = countryDetail.capital
        const country_area = countryDetail.area
        const country_lang = Object.values(countryDetail.languages)
        const country_flag = countryDetail.flags

        setTarget(country_capital)

        setTargetCountry({
          "countryName": country_name,
          "capital": country_capital,
          "area": country_area,
          "lang": country_lang,
          "flag": country_flag
        })

      })

  }

  useEffect(() => {
    country
      .getAll()
      .then(allCountry => {
        const all = allCountry.map(a => a.name["common"])
        setAllName(all)
      })
  }, [])

  useEffect(() => {
    if (name === "") {
      setTargetCountry({})
      setTarget("")
      setShow("")
      return
    }

    setTargetCountry({})
    setTarget("")
    const filtered = allCountryName.filter(a => a.startsWith(name))

    if (filtered.length > 10) { setShow("Too many matches,specify another filter") }
    else if (filtered.length > 1) { setShow(filtered)  }
    else if (filtered.length === 1) {
      setShow("")
      const place = filtered[0].toLowerCase()
      target(place)
    }
    else { setShow("") }

  }, [name])

  const handleChange = (e) => {
    const newName = e.target.value
    const format = newName.slice(0, 1).toUpperCase() + newName.slice(1)

    setName(format)
  }

  const targetFound = Object.keys(targetCountry).length > 0

  const pickShow = show === "" ? null : Array.isArray(show) ? <ShowFiltered setTarget={setTarget} show={show} setTargetCountry={setTargetCountry} target={target} /> : <p>{show}</p>


  return (
    <div>
      <form>
        <p>Find country <input onChange={(e) => handleChange(e)} /></p>
      </form>

      {targetFound ? <ShowTarget  targetCountry={targetCountry} /> : pickShow}

      {targetFound ? <Weather target={targetName} /> : ""}

    </div>
  )
}

export default App


