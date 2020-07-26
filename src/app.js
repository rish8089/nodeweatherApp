const express = require('express')
const path = require('path')
const app = express() //returns the object of express application
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const hbs = require('hbs')
const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')

//app.com
//app.com/help
//app.com/contact
//app.com/about

/**
 * this line customizes the server and enables it to use the static location
 * given and it will pull the HTML pages as and when required from this static
 * location.
 */



//static pages

//there are dynamic pages
//we will learn template engines to render dynamic pages using express
//template engine which we are going to use is called handle bars
/*
express accesses this public Directory path
*/

//handler bars makes it easy to write code that can be reused at other pages
//using handle bars we can render dynamic pages     

//we want to use handlebars with our express servers
//there is another module hbs that makes it easy to integrate with express

//we can use hbs to create some dynamic templates
app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rishab Shinghal'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rishab Shinghal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rishab Shinghal'
    })
})
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({ error: 'You have to provide the search term' })
    }

    geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
        if (error)
            res.send({ error })
        else {
            //geocodeData = data
            forecast(latitude, longitude, (error, forecastData) => {
                if (error)
                    res.send({ error })
                else {
                    res.send({
                        forecast: forecastData,
                        location: place,
                        address: req.query.address
                    })

                }
            });
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Help article not found',
        name: 'Rishab Shinghal'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Page not found',
        name: 'Rishab Shinghal'
    })
})



app.listen(3000, () => {
    console.log('server started listening on port 3000')
})