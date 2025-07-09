const express = require('express')
const reportController = require('../controllers/reportController')

const router = express.Router()

/**
 * @swagger
 * /reports/weekly:
 *   get:
 *     summary: Gerar relatório semanal de vendas
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Relatório semanal gerado com sucesso
 */
router.get('/weekly', reportController.weekly) 

module.exports = router