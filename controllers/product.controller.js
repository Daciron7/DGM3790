import { Product } from '../models/product.js'

export const postAddProduct = ((req, res) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
    })
    console.log(product)
    product.save()
    res.json(product)
})

export const getAllProducts = ((req, res) => {
    console.log(Product.fetchAll())
    res.json(Product.fetchAll())
})