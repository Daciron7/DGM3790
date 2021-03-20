import mongoose from 'mongoose'

const Schema = mongoose.Schema

const cardSchema = new Schema({
    title: {
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
    hp: {
        type: String,
        required: true
    },
    attacks: {
        type: String,
        required: false
    }
})


export const Cards = mongoose.model('Cards', cardSchema)