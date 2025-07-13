const express = require('express')
const reportController = require('../controllers/reportController')

const router = express.Router()

/**
 * @swagger
 * /reports/weekly:
 *   get:
 *     summary: Genera rapporto settimanale dell'inventario
 *     tags: [Rapporti]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data di inizio (opzionale)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data di fine (opzionale)
 *     responses:
 *       200:
 *         description: Rapporto PDF generato con successo
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Date non valide
 *       404:
 *         description: Nessun prodotto trovato
 */
router.get('/weekly', reportController.weekly)

module.exports = router