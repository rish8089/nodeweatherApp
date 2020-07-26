const request = require('request')
var _ = undefined
//Weather service
const weatherService = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=78c06915ddc6c5c574f45344f3685ab7&query=' + latitude + ',' + longitude
    request({ url: url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service')
        }
        else if (body.error) {
            callback('Unable to find location')
        }
        else
            callback(_, body.current.weather_descriptions[0] + ". It's currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out")
    })
}
module.exports = weatherService