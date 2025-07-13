module.exports = (err, req, res, next) => {
    console.error('Errore intercettato dal middleware:', err)
    
    // Errori di validazione MongoDB
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message)
        return res.status(400).json({ error: 'Errore di validazione', details: errors })
    }
    
    // Errore di duplicazione (SKU già esistente)
    if (err.code === 11000) {
        return res.status(400).json({ error: 'SKU già esistente' })
    }
    
    // Errore di cast (ID non valido)
    if (err.name === 'CastError') {
        return res.status(400).json({ error: 'ID non valido' })
    }
    
    // Errore generico
    res.status(500).json({ error: 'Errore Interno del Server' })
}