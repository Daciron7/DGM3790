# React_Node_App
## About App

This is Fun Stuff app, which includes some fun things including some ship info from World of Warships, different esports teams from League of Legends, and a fun GraphicQL plugin.

## Random Cats
This page showcases gifs of random cats.

## Warships Ship Info
This component displays a collaspible list of warships and brief descriptions of said ships as well as an image of the said ship. You can check out the code here, [link](my-app/public/src/components/warshipFacts.js)

## GraphQL addition
This component displays an addition of an api from GraphQL. The api being used is from Rick and Morty. 

## Restful CRUD API with Pokemon TCG cards
In honor of the 25th Anniversary of Pokemon, I have created a Restful CRUD API with the Pokemon TCG API. This allows the user to get, update, and even delete cards from the page.



## Live Site
You can access the live build here, [link](https://arcane-crag-91152.herokuapp.com/)


## Getting Started
```
1. npm run postinstall
```
```
2. npm run test
```
```
3. npm run seed
```
```
4 npm run heroku-postbuild
```
```
5 npm run start-dev
```
```
6 npm run start
```
```
7 npm run build
```


### RESTful CRUD Pokemon TCG functions
## Get TCG Cards
```
const options = {
    method: 'GET',
    url: 'https://api.pokemontcg.io/v2/cards',
    params: {q: 'Pikachu'},
    headers: {
      'x-rapidapi-key': `${process.env.POKEMON_TCG_API_KEY}`,
      'x-rapidapi-host': 'https://api.pokemontcg.io'
    }
  }

```

## Add TCG Cards
```
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
```

## Update TCG Cards
```
export const updateCard = async (req, res) => {
    const cardId = req.body.data.cardId
    const updatedObj = {
        title: req.body.data.title,
        types: req.body.data.types,
        attacks: req.body.data.attacks,
        image: {
            imageUrl: req.body.data.imageUrl,
            height: req.body.data.height,
            width: req.body.data.width,
        }
    }
    try {
        const card = await Card.findByIdAndUpdate(cardId, updatedObj, { new: true })
        res.status(200).json(card)
    } catch (err) {
        res.status(400).json({Message: `Could not update: ${err}`})
    }
}
```

## Delete TCG Cards
```
export const deleteCard = async (req, res) => {
    const cardId = req.body.cardId
    try {
        const deletedCard= await Card.findByIdAndRemove(cardId)
        if (!deletedCard) {
            return res.status(400).json({Message: `Card to delete not found.`})
        }
        console.log(`Deleted the card: ${deletedCard}`)
        res.sendStatus(200) // a simple success
    } catch (err) {
        res.status(400).json({Message: `Invalid ID: ${err}`})
    }
}
```

### Prisma Graphql Client - Steam Games List
(Currently updating)
