import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'

export default function WeatherSingle() {
    const { login, user, logout } = useContext(AuthContext)
    const { id, uid } = useParams()
    const [city, setCity] = useState({})
    const [postError, setPostError] = useState(false)
    const { getCity } = useContext(DataContext)
    const [loadingState, setLoadingState] = useState("LOADING")

    useEffect(() => {
        async function handleLoad() {
            try {
                const data = await getCity(uid, id)
                setCity(data)
                setLoadingState("LOADED")
            } catch (err) {
                setPostError(true)
            }
        }

        handleLoad()
    }, [uid, id])

    return (
        <div className="App">
            {
                (loadingState === "LOADING") ?
                    <p>Loading...</p> :
                    <div>
                        <h2>Weather for: {user.displayName}</h2>
                        <h2 className="city-display">{city.name}</h2>
                        <div className="container-weather">
                            <div className="weather-box">
                                <h4 className="tempOne">High</h4>
                                <h4>{Math.round((city.main.temp_max - 273.15) * 9 / 5 + 32)} ℉ </h4>
                            </div>
                            <div className="weather-box">
                                <h4 className="tempTwo">Low</h4>
                                <h4>{Math.round((city.main.temp_min - 273.15) * 9 / 5 + 32)} ℉ </h4>
                            </div>
                            <div className="weather-box">
                                <h4 className="tempThree">Forcast</h4>
                                <h4>{city.weather[0].main} </h4>
                                <h5><img scr={`https://openweathermap.org/img/wn/${city.weather[0].icon}.png`} alt=""/></h5>
                            </div>
                        </div>

                    </div>
            }

            {postError ?
                <>
                    <h2> 404 </h2>
                    <p> could not be found</p>
                </> :
                <></>
            }
        </div>
    )
}