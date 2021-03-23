import React, {useContext, createContext, useState, useEffect} from 'react'
import axios from 'axios'


const FunStuffContext = createContext({
   randomfact: [],
    
})

export const FunStuffContextProvider = (props) => {
    const [randomkitty, setRandomKitty] = useState([])


    useEffect(() => {
        // fetch the data and set up state for it
        const fetchCatFacts = async (side) => {
            try {
                axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_CAT_API_KEY
                let response = await axios.get('https://api.thecatapi.com/v1/images/search')
                const facts = await response.data.results[0].cats
                if (side === 'randomkitty') setRandomKitty(facts)
           } catch (error) {
                console.log(error)
            }
        }
        fetchCatFacts('randomkitty')
    }, [])

    return (
        <FunStuffContext.Provider value={
           {randomkitty}
       }>
            {props.children}
        </FunStuffContext.Provider>
   )
}

export const useFunStuffContext = () => useContext(FunStuffContext)