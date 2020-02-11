const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/f24d24c388d2b7155eee0b2c54c7dd2d/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, { body }={}) => {

        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, (body.daily.data[0].summary +
                ' It is currently ' + body.currently.temperature +
                ' celcius degrees out. The high today is ' + body.daily.data[0].temperatureHigh + ' degrees celcius with the low of ' +
                 body.daily.data[0].temperatureLow + ' degrees celcius. There is ' + body.currently.precipProbability + '% chance of rain.')
            )
        }

    })

}

module.exports = forecast