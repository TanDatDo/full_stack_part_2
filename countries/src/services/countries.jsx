import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getCountries = (filterName) => {
  return axios.get(`${baseUrl}/api/name/${filterName}`)
}

const getAll = () => {
    return axios.get(`${baseUrl}/api/all`)
}

export default { 
    getCountries: getCountries,
    getAll: getAll
}