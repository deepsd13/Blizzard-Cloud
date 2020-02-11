const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const mainContent = document.querySelector('#main-content')
const humidity = document.querySelector('#humidity')
const windSpeed = document.querySelector('#windSpeed')
const cloudCover = document.querySelector('#cloudCover')
const uvIndex = document.querySelector('#uvIndex')
const button = document.createElement('button')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (document.getElementById('more-info') != null)
        document.getElementById('more-info').parentNode.removeChild(document.getElementById('more-info'))
    const location = search.value

    messageOne.textContent = "Finding the location...."
    messageTwo.textContent = ''
    humidity.textContent = ''
    windSpeed.textContent = ''
    cloudCover.textContent = ''
    uvIndex.textContent = ''
    button.textContent = ''





    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        response.json().then((data) => {


            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                button.setAttribute('id', 'more-info')
                button.textContent = 'More Info'
                mainContent.appendChild(button)
            }

            button.addEventListener('click', (e) => {
                fetch('http://localhost:3000/weather/moreInfo?address=' + location).then((response) => {
                    response.json().then((data) => {

                        if (data.error) {
                            humidity.textContent = data.error
                        } else {
                            const div = document.getElementById('more-info')

                            humidity.textContent = 'Humidity: ' + data.forecast.Humidity + '%'
                            windSpeed.textContent = 'Wind Speed: ' + data.forecast.windSpeed + ' m/s'
                            cloudCover.textContent = 'Cloud Cover: ' + data.forecast.cloudCover + ' okta'
                            uvIndex.textContent = 'UV Index: ' + data.forecast.uvIndex

                        }
                    })
                })

            })
        })
    })
})