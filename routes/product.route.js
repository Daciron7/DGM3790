import { Router } from 'express'

export const productRouter = Router()

import { postAddProduct, getAllProducts } from '../controllers/product.controller.js'

productRouter.post('/', postAddProduct)

productRouter.get('/', getAllProducts)
