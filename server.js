const express = require('express')
const morgan = require('morgan')
const MOVIES = require('./movie-data-small.json')

const app = express()

app.use(morgan('dev'))

app.get('/movie', function handleGetMovie(req, res) {
    let response = MOVIES

    if(req.query.genre) {
        response = response.filter(movie => movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
        )
    }

    if(req.query.country) {
        response = response.filter(movie => movie.country.toLowerCase().includes(req.query.country.toLowerCase())
        )
    }

    if(req.query.avg_vote) {
        response = response.filter(movie => Number(movie.avg_vote) >= Number(req.query.avg_vote))
    }

    res.json(response)
})

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})