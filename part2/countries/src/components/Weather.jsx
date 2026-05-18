import React from "react";
import { useState, useEffect } from "react";
import weather from "../services/weather";

const Weather = ({ target }) => {
    const [targetWeather, setWeather] = useState({})

    useEffect(() => {
        weather.get(target)
            .then(w => {
                if (w.list && w.list.length > 0) {
                    const allInfo = w.list[0]
                    const temp = allInfo.main.temp
                    const wind = allInfo.wind.speed
                    const icon = allInfo.weather[0].icon

                    setWeather({
                        "temp": temp,
                        "wind": wind,
                        "icon": icon
                    })
                }
            })
    }, [target])

    return (
        <div>
            <h1>Weather in {target}</h1>
            <p>Temperature : {targetWeather.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${targetWeather.icon}@2x.png`} alt="weather icon" />
            <p>Wind : {targetWeather.wind} m/s</p>

        </div>
    )


}

export default Weather