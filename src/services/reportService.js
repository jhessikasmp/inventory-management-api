const PDFDocument = require('pdfkit')
const Products = require('../models/product')

exports.generateWeeklyPDF = async (res, startDate, endDate) => {
    try {
        const products = await Products.find()

        if (!products || products.length === 0)
            return res.status(404).json({ error: 'Nenhum produto encontrado' })

        const doc = new PDFDocument({ margin: 30, size: 'A4' })

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=relatorio-semanal.pdf')

        doc.on('error', (err) => {
            console.error('Erro no documento PDF:', err)
            if (!res.headersSent) {
                res.status(500).json({ error: 'Erro ao gerar PDF' })
            }
        })
        
        res.on('error', (err) => {
            console.error('Erro na resposta:', err)
        })

        doc.pipe(res)
        doc.fontSize(20).text('Relatório Semanal de Estoque', { align: 'center' }).moveDown()
        doc.fontSize(12).text(`Período: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`).moveDown()
        doc.fontSize(14).text('Produtos').moveDown()

        products.forEach(product => {
            try {
                const name = product.name || 'Nome não informado'
                const quantity = product.quantity !== undefined ? product.quantity : 0
                const price = product.price !== undefined ? product.price : 0
                const expiryDate = product.expiryDate ? product.expiryDate.toLocaleDateString() : 'Data não informada'
                
                doc.fontSize(12).text(`${name} | Qtd: ${quantity} | €${price.toFixed(2)} | Val: ${expiryDate}`)
            } catch (productErr) {
                console.error('Erro ao processar produto:', productErr)
                doc.fontSize(12).text('Erro ao processar produto')
            }
        })

        doc.end()
    } catch (err) {
        console.error('Erro ao gerar PDF:', err)
        if (!res.headersSent) {
            res.status(500).json({ error: 'Erro ao gerar relatório PDF', details: err.message })
        }
    }
}