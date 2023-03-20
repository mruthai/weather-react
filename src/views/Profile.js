import { useState, useEffect, useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'
import WeatherForm from '../components/WeatherForm'
import WeatherPost from '../components/WeatherPost'
import { AuthContext } from '../contexts/AuthProvider'

export default function Profile() {
    const { login, user, logout } = useContext(AuthContext)
    const { cities } = useContext(DataContext)
    return (
        <div className="App">
            {
                (user.loggedIn)
            }
            <h1>Welcome {user.displayName} </h1>
            <div>
                <WeatherForm />
                
            </div>
            { cities.map((post) => <WeatherPost post={post} key={post.id}/>) }
        </div>
    )
}