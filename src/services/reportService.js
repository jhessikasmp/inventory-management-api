const PDFDocument = require('pdfkit')
const Products = require('../models/product')

exports.generateWeeklyPDF = async (startDate, endDate) => {
    try {
        const allProducts = await Products.find()

        if (!allProducts || allProducts.length === 0) {
            throw new Error('Nessun prodotto trovato')
        }

        const doc = new PDFDocument({ margin: 30, size: 'A4' })
        const buffers = []

        doc.on('data', buffers.push.bind(buffers))
        
        return new Promise((resolve, reject) => {
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(buffers)
                resolve(pdfBuffer)
            })

            doc.on('error', reject)

            doc.fontSize(20).text('Rapporto Settimanale di Inventario', { align: 'center' }).moveDown()
            doc.fontSize(15).text(`Periodo: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`).moveDown()
            doc.fontSize(15).text('Prodotti').moveDown()

            allProducts.forEach(product => {
                try {
                    const name = product.name || 'Nome non specificato'
                    const quantity = product.quantity !== undefined ? product.quantity : 0
                    const price = product.price !== undefined ? product.price : 0
                    const expiryDate = product.expiryDate ? product.expiryDate.toLocaleDateString() : 'Data non specificata'

                    doc.fontSize(15).text(`${name} | Quantità: ${quantity}, €${price.toFixed(2)} | Scadenza: ${expiryDate}`)
                } catch (productErr) {
                    console.error('Errore durante l\'elaborazione del prodotto:', productErr)
                    doc.fontSize(12).text('Errore durante l`elaborazione del prodotto')
                }
            })

            doc.end()
        })
    } catch (err) {
        console.error('Errore durante la generazione del PDF:', err)
        throw err
    }
}
