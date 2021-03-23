import { Router } from 'express'

export const cardRouter = Router()

import { addCards, cards, deleteCard, getCardById, updateCard} from '../controllers/card.controller.js'

cardRouter.post('/', addCards)

cardRouter.get('/', cards)

cardRouter.delete('/delete', deleteCard)

cardRouter.get('/id', getCardById)

cardRouter.put('/update', updateCard)

