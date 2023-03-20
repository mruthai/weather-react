
import { useState, useEffect, createContext, useContext } from 'react'
import { getFirestore, getDocs, collection, doc, getDoc, addDoc, collectionGroup, query } from '@firebase/firestore'
import { AuthContext } from './AuthProvider'
export const DataContext = createContext()

const API_KEY = process.env.REACT_APP_API_KEY

export const DataProvider = function(props) {
    const [data, setData] = useState({})
    const [cities, setCities] = useState([])
    const { user } = useContext(AuthContext)
    const db = getFirestore()
    console.log(cities)
    useEffect(() => {
        async function getCities() {
            const postQuery = query(collectionGroup(db, 'cities'))
            const querySnapshot = await getDocs(postQuery)
            const loadedCities = []
            querySnapshot.forEach((doc) => {
                loadedCities.push({
                    id: doc.id,
                    uid: doc.ref.parent.parent.id,
                    ...doc.data()
                })
            })
            setCities(loadedCities)
        }
        getCities()
    }, [])

    async function getCity(uid, id) {
        console.log('Working?')
        const docRef = doc(db, 'users', uid, 'cities', id)
        const docSnap = await getDoc(docRef)
        console.log('test response')
        console.log(docSnap.data())
        
        if (docSnap.exists()) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${docSnap.data().city}&appid=${API_KEY}`)
        const data = await response.json()
        setData(data)
        console.log('test response')
        console.log(data)
        return data
        
    } else {
            throw new Error()
        }
    }
    
    async function addCity(city) {
        const newCity = {
            city
            
        }

        const docRef = await addDoc(collection(db, 'users', user.uid, 'cities'), newCity)

        newCity.id = docRef.id

        setCities([
            newCity,
            ...city
        ])
        window.location.reload()
        return newCity
    }
    

    const value = {
        cities,
        getCity,
        addCity,
        data
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}