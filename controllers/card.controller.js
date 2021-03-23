import { Cards } from '../models/cards.js'

export const addCards = ((req, res) => {
    const card = new Cards({
        title: req.body.title,
        types: req.body.types,
        image: req.body.image,
        id: req.body.id,
        attacks: req.body.attacks
    })
    console.log(card)
    card.save() // save method is provided by Mongoose
    res.json(card)
})

export const cards = async (req, res) => {
    const cards = await Card.find()
    if (!cards) {
        return res.status(400).json({Message: `No cards found!`})
    }
    res.json(movies)
}

export const getCardById = async (req, res) => {
    const cardId = req.body.cardId
    console.log(cardId)
    try {
        const card = await Card.findById(cardId)
        if (!card) {
            return res.status(404).json({ Message: 'Card not found!' })
        }
        res.json(product)
    } catch(err) {
        res.status(400).json({Message: `Invalid ID: ${err}`})
    }
}

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