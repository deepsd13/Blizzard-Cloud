const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const moreInfo = require('./utils/forecast-moreInfo')


const app = express()

// Define paths for express configuration
const publicDirPath = (path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars for engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Blizzard Cloud',
        name: 'Deep Shah'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Blizzard Cloud',
        name: 'Deep Shah'

    })
})

app.get('/resources', (req, res) => {
    res.render('resources', {
        title: 'Help',
        name: 'Deep Shah'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        } //if theres an error fucntions stops

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })

    })

})

app.get('/weather/moreinfo', (req, res) => {


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        } //if theres an error fucntions stops

        moreInfo(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

})





app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)

    res.send({
        products: []
    })

})

app.get('/resources/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deep Shah',
        errorMessage: 'Help article not found7'
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deep Shah',
        errorMessage: 'Page not found'
    })

})

app.listen(3000, () => {
    console.log('The server is up on port 3000')
}) // port 3000 is the deafault port 