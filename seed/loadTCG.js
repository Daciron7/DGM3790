import axios from 'axios'
import { Card } from '../models/cards.js'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const seedMongo = async () => {
  // Mongoose is not connected when the seed is run standalone, so start a new connection here
    await mongoose.connect(`${process.env.DGM4790_CONNECTION_STRING}`,
  {
      useNewUrlParser: true,
       useUnifiedTopology: true,
  
})
   

  


  const options = {
    method: 'GET',
    url: 'https://api.pokemontcg.io/v2/cards?page=1',
    params: {q:'name:charizard'},
    headers: {
      'x-rapidapi-key': `${process.env.POKEMON_TCG_API_KEY}`,
      'x-rapidapi-host': 'https://api.pokemontcg.io/v2/cards'
    }
  }
    
    try {
      const response = await axios.request(options)
      //console.log(response.data.d[0])
      //await addCards(response.data.d[0])
      await addCards(response.data.d)
      await mongoose.connection.close() // close connection after all work is done
  }
    catch (error) {
      console.error(error)
    }
    
  }  
  
  const addCard = async (oneCard) => {
      const card = new Card({
          name: oneCard.l,
          types: oneCard.types,
          image: oneCard.i,
          id: oneCard.id,
          attacks: oneCard.attacks
      })
      //console.log(card)
      await card.save() // save method is provided by Mongoose
      console.log('Added successfuly')
  }
  
  const addCards = async (cardList) => {
    for (let card of cardList) {
      //console.log(card)
      await addCard(card)
    }
  }
  
  seedMongo()