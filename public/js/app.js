console.log('Java script client side');
//asynchronous io operaton
/*fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});*/
var _ = undefined
const fetchWeatherData = (location, callback) => {
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                callback(data.error)
            }
            else {
                callback(_, data)
            }
        });
    });
}
const weatherForm = document.querySelector('form')
const search = weatherForm.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    fetchWeatherData(search.value, (error, { location, forecast } = {}) => {
        if (error) {
            messageOne.textContent = error
            messageTwo.textContent = ""
        }
        else {
            messageOne.textContent = location
            messageTwo.textContent = forecast
        }
    })
})