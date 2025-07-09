const logger = require('../logger')
const Products = require('../models/product')

exports.getAll = async (req,res,next) => {
    try {
        const products = await Products.find()
        res.json(products)
    } catch (err) {
        next(err)
    }
}

exports.getById = async (req,res,next) => {
    try {
        const product = await Products.findById(req.params.id)
        if (!product) 
            return res.status(404).json({ error: 'Produto nao encontrado'})
        res.json(product)
    } catch (err) {
        next(err)
    }
}

exports.create = async (req,res,next) => {
    try {
        const { name, sku, quantity, price, expiryDate } = req.body
        const product = await Products.create({ name, sku, quantity, price, expiryDate })
        logger.info('Produto criado', { product })
        res.status(201).json(product)
    } catch (err) {
        next(err)
    }
}

exports.update = async (req,res,next) => {
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body,
            { new: true, runValidators: true})

        if(!product)
            return res.status(404).json({ error: 'Produto nao encontrado' })
        logger.info('Produto atualizado', { product })
        res.json(product)
    } catch (err) {
        next(err)
    }
}

exports.delete = async (req,res,next) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.id)
        if (!product)
            return res.status(404).json({ error: 'Produto nao encontrado'})
        logger.info('Produto excluido', { id: req.params.id })
        res.json({ message: 'Produto excluido com sucesso'})
    } catch (err) {
        next(err)
    }
}

exports.sell = async (req,res,next) => {
    try {
        const { quantitySold } = req.body
        if (!quantitySold || quantitySold <=0)
            return res.status(400).json({ error: 'Quantidade de venda invalida'})

        const product = await Products.findById(req.params.id)
        if (!product) 
            return res.status(404).json({ error: 'Produto nao encontrado'})

        if (product.quantity < quantitySold)
            return res.status(400).json({ error: 'Estoque insuficiente' })

        product.quantity -= quantitySold
        await product.save()
        logger.info('Venda registrada', { id: req.params.id, quantitySold})
        res.json(product)
    } catch (err) {
        next(err)
    }
}