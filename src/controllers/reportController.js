const { generateWeeklyPDF } = require('../services/reportService')

const lastWeekStart = () => {
    const day = new Date()
    const weekDay = day.getDay()
    day.setDate(day.getDate() - (weekDay === 0 ? 7 : weekDay))
    return day
}

exports.weekly = async (req, res, next) => {
    try {
        let start, end

        if(req.query.startDate) {
            start = new Date(req.query.startDate)
            if (isNaN(start.getTime())) {
                return res.status(400).json({ error: 'Data di inizio non valida' })
            }
        } else {
            start = lastWeekStart()
        }

        if(req.query.endDate) {
            end = new Date(req.query.endDate)
            if (isNaN(end.getTime())) {
                return res.status(400).json({ error: 'Data di fine non valida' })
            }
        } else {
            end = new Date()
        }    

        if (start > end) {
            return res.status(400).json({ error: 'La data di inizio non può essere successiva alla data di fine' })
        }

        const pdfBuffer = await generateWeeklyPDF(start, end)
        
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=weekly-report.pdf')
        res.send(pdfBuffer)
    } catch (err) {
        console.error('Errore nel controller weekly', err)
        next(err)
    }
}