const express = require('express')
const productController = require('../controllers/productController')

const router = express.Router()

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Ottieni tutti i prodotti
 *     tags: [Prodotti]
 *     responses:
 *       200:
 *         description: Lista di tutti i prodotti
 */
router.get('/', productController.getall)

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Ottieni un prodotto per ID
 *     tags: [Prodotti]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del prodotto
 *     responses:
 *       200:
 *         description: Prodotto trovato
 *       404:
 *         description: Prodotto non trovato
 */
router.get('/:id', productController.getById)

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuovo prodotto
 *     tags: [Prodotti]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               sku:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Prodotto creato con successo
 */
router.post('/', productController.create)

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Aggiorna un prodotto
 *     tags: [Prodotti]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del prodotto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               sku:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Prodotto aggiornato con successo
 *       404:
 *         description: Prodotto non trovato
 */
router.put('/:id', productController.update)

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un prodotto
 *     tags: [Prodotti]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del prodotto
 *     responses:
 *       200:
 *         description: Prodotto eliminato con successo
 *       404:
 *         description: Prodotto non trovato
 */
router.delete('/:id', productController.delete)

/**
 * @swagger
 * /products/{id}/sell:
 *   post:
 *     summary: Vendi un prodotto
 *     tags: [Prodotti]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del prodotto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantitySold:
 *                 type: number
 *                 description: Quantità venduta
 *     responses:
 *       200:
 *         description: Vendita registrata con successo
 *       400:
 *         description: Quantità non valida o scorte insufficienti
 *       404:
 *         description: Prodotto non trovato
 */
router.post('/:id/sell', productController.sell)

module.exports = router