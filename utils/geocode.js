const request = require('request')
var _ = undefined
const locationService = (location, callback) => {
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoicHJhdDEyMyIsImEiOiJja2N5aWpnYzUwYTd0MnlxZXNlc3AxcnJ5In0.hPjJg2oiIBp0LRUc2G8HWQ';
    request({ url: mapUrl, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to map servic')
        }
        else if (!body.features || body.features.length == 0) {
            callback('Unable to find location')
        }
        else {
            callback(_, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}
module.exports = locationService