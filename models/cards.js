import mongoose from 'mongoose'

const Schema = mongoose.Schema

const cardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    types: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: false
    },
    id: {
        type: String,
        required: true
    },
    attacks: {
        type: String,
        required: false
    }
})


export const Card = mongoose.model('Card', cardSchema)