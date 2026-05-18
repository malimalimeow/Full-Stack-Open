import React from "react";

export const ShowFiltered = ({ setTarget, show, setTargetCountry, target }) => (
    show.map((f, i) => <FilteredLine key={i} countryName={f} setTargetCountry={setTargetCountry} target={target} setTarget={setTarget} />)
)

export const FilteredLine = ({ countryName, setTargetCountry, target, setTarget }) => (
    <div >
        <span >{`${countryName} `}</span>
        <button onClick={() => target(countryName)}>show</button>
    </div>
)

export const ShowTarget = ({ targetCountry }) => {
    const { countryName, capital, area, lang, flag } = targetCountry

    return (

        <div>
            <h1>{countryName}</h1>
            {capital.map((cap, i) => <p key={i}> Capital :{cap}</p>)}
            <p>Area: {area}</p>
            <h1>Language</h1>
            <ul>
                {lang.map((lang, i) => <li key={i}>{lang}</li>)}
            </ul>
            <img src={flag.png} alt={flag.alt ? flag.alt : "Country Flag"} />

        </div>)
}

