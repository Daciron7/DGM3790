import axios from 'axios'
import { Cards } from '../models/cards.js'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const seedMongo = async() => {
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://user:Tacos@cluster0.bda5m.mongodb.net/Project1?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
client.connect(err => {
  const collection = client.db("test").collection("devices")
  // perform actions on the collection object
  client.close();
})
  
  
  const options = {
    method: 'GET',
    url: 'https://api.pokemontcg.io/v2/cards',
    params: {q: 'charizard'},
    headers: {
      'x-rapidapi-key': `${process.env.POKEMON_TCG_API_KEY}`,
      'x-rapidapi-host': 'https://api.pokemontcg.io'
    }
  }
    
    try {
      const response = await axios.request(options)
      //console.log(response.data.d[0])
      //await addCards(response.data.d[0])
      await addCards(response.data.d)
      await mongoose.connection.close() // close connection after all work is done
    } catch (error) {
      console.error(error)
    }
    
  }
  
  const addCard = async (oneCard) => {
      const card = new Cards({
          title: oneCard.l,
          types: oneCard.types,
          image: oneCard.i,
          hp: oneCard.hp,
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