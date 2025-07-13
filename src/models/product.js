const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true},
    sku: { type: String, unique: true, required: true},
    quantity: { type: Number, required: true},
    price: { type: Number, required: true},
    expiryDate: { type: Date, required: true},
    createdAt : { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now}
})

ProductSchema.pre('save', function(next) {
    this.updatedAt = new Date()
    next()
})

ProductSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: new Date() })
    next()
})

module.exports= mongoose.model('products', ProductSchema)