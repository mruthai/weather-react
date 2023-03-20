import { useState, useContext } from "react"
import { DataContext } from '../contexts/DataProvider'

export default function WeatherForm() {
    const [city, setCity] = useState('')
    const { addCity } = useContext(DataContext)

    async function handleSubmit(e) {
        e.preventDefault()
        const newPost = await addCity(city)
        setCity('')

    }

    return (
        <form className="search-box" onSubmit={handleSubmit}>
            <div className="search">
                <input placeholder="add your city"
                    type="text" name="city" id="city"
                    onChange={(e) => setCity(e.target.value.toUpperCase())}
                    value={city} />
            </div>
            <div>
                <button className="search-btn"> Add City</button>
            </div>
        </form>
    )
}