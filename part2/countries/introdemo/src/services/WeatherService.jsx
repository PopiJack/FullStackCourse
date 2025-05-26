import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const getWeatherByCity = (city) => {
    const apiKey = import.meta.env.VITE_SOME_KEY
    const request = axios.get(`${baseUrl}q=${city}&appid=${apiKey}`)
    return request.then(response => response.data)
}

export default {
    getWeatherByCity: getWeatherByCity,
}