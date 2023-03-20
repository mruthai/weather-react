import logo from './logo.svg';
import './App.css';
import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home'
import Profile from './views/Profile'
import WeatherSingle from './views/WeatherSingle'
import { AuthContext } from './contexts/AuthProvider'
import  Protected  from './components/Protected'



function App() {
  const { login, user, logout } = useContext(AuthContext)
  console.log(user)


  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <h2>Weather App</h2>
          <ul>
            {
              (!user.loggedIn) ?
                <>
                </> :
                <li><Link to="/profile">Profile</Link> </li>
            }
            <li>
              {
                (user.loggedIn) ?
                  <>
                    <button onClick={logout}> Logout</button>
                  </> :
                  <button onClick={login}> Login</button>
              }
            </li>
          </ul>
        </nav>
      </div>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/Profile" element={<Protected> <Profile/> </Protected>} />

        <Route path="/WeatherSingle/:uid/:id" element={<Protected> <WeatherSingle /> </Protected>} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
