import { Router } from 'express'

export const cardRouter = Router()

import { addCards, cards, deleteCard} from '../controllers/cards.controller.js'

cardRouter.post('/', addCards)

cardRouter.get('/', cards)

cardRouter.delete('/delete', deleteCard)

/* cardRouter.get('/id', getCardById)

cardRouter.put('/update', updateCard)

 */