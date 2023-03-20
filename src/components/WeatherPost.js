import { Link } from 'react-router-dom'

export default function WeatherPost(props) {
    return (
        // <div className="App">
            <div className="profile-container">
                <div className="favorite-container">
                    <h2 ClassName="fav-city">{props.post.city}</h2>

                    {
                        <Link className="btn" to={`/weathersingle/${props.post.uid}/${props.post.id}`}> Weather Details </Link>
                    }
                </div>
            </div>
        // </div>
    )
}