import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (lat, lon) => {
  console.log(lat)
  console.log(lon)
  console.log(api_key)
  const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric}`
  console.log(url)
  return axios.get(url)
}

export default { 
  getWeather
}