const { generateWeeklyPDF } = require('../services/reportService')

const lastWeekStart = () => {
    const day = new Date()
    const weekDay = day.getDay()
    day.setDate(day.getDate() - (weekDay === 0 ? 7 : weekDay))
    return day
}

exports.weekly = async (req,res,next) => {
    try {
        let start, end
        
        if(req.query.startDate) {
            start = new Date(req.query.startDate)
            if (isNaN(start.getTime())) { 
                return res.status(400).json({ erro: 'Data de inicio invalida'})
            }
        } else { 
            start = lastWeekStart() 
        }

        if(req.query.endDate) {
            end = new Date(req.query.endDate)
            if (isNaN(end.getTime())) { 
                return res.status(400).json({ erro: 'Data de fim invalida'})
            }
        } else { 
            end = new Date() 
        }  

        if (start > end) {
            return res.status(400).json({ erro: 'Data de inicio maior que a data de fim'})
        }

        await generateWeeklyPDF(res, start, end)
    } catch (err) {
        console.error('Erro no controller weekly', err)
        next(err)
    }
}