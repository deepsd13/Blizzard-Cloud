const request = require('request')

const moreInfo = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/f24d24c388d2b7155eee0b2c54c7dd2d/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, ({
                Humidity: body.daily.data[0].humidity,
                windSpeed: body.daily.data[0].windSpeed,
                cloudCover: body.daily.data[0].cloudCover,
                uvIndex: body.daily.data[0].uvIndex
            })
            )
        }

    })

}

module.exports = moreInfo