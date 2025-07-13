const logger = require('../logger')
const Products = require('../models/product')

exports.getall = async (req, res, next) => {
    try {
        const product = await Products.find()
        res.json(product)
    } catch (err) {
        next(err) 
    }
}

exports.getById = async (req, res, next) => {
    try {
        const product = await Products.findById(req.params.id)
        
        res.status(200).json(product)
    } catch (err) {
        next(err)
    }
}

exports.create = async (req, res, next) => {
    try {
        const { name, sku, quantity, price, expiryDate } = req.body
        const product = await Products.create({ name, sku, quantity, price, expiryDate })
        logger.info(`Prodotto creato`, { product })
        res.status(201).json(product)
    } catch (err) {
        next(err)
    }
}

exports.update = async (req, res, next) => {
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body,
            { new: true, runValidators: true })

        if (!product)
            return res.status(404).json({ error: `Prodotto non trovato` })
        logger.info('Prodotto aggiornato', { product })  
        res.status(201).json(product)
    } catch (err) {
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
       const product = await Products.findByIdAndDelete(req.params.id)

       if (!product)
            return res.status(404).json({ error: `Prodotto non trovato` })
        logger.info(`Prodotto eliminato`, { product })
        res.status(201).json({ message: `Prodotto eliminato con successo` })
    } catch (err) {
        next(err)
    }
}

exports.sell = async (req, res, next) => {
    try {
        const { quantitySold } = req.body

        if (!quantitySold || quantitySold <=0)
            return res.status(400).json({ error: `Quantità di vendita non valida` })

        const product = await Products.findById(req.params.id)
        
        if (!product)
            return res.status(404).json({ error: `Prodotto non trovato` })

        if (product.quantity < quantitySold)
            return res.status(400).json({ error: `Scorte insufficienti` })

        product.quantity -= quantitySold
        await product.save()
        logger.info(`Vendita registrata`, { id:req.params.id, quantitySold })
        res.status(201).json(product)
    } catch (err) {
        next(err)
    }
}