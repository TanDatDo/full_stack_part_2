import { useState, useEffect } from 'react'
import CountrySearch from './components/CountrySearch'
import countryService from './services/countries'
import Country from './components/Country'
import CountryItem from './components/CountryItem'
import weatherService from './services/weather'

function App() {

  const [filterName, setFilterName] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [specificCountry, setSpecificCountry] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [weather, setWeather] = useState([])


  const handleFilterNameChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
    filterCountries(event.target.value)
  }

  const hook = () => {
    console.log('effect')
    countryService.getAll().then(response => {
      setCountries(response.data)
    })
  }

  function jsonConcat(o1, o2) {
    for (var key in o1) {
     o2[key] = o1[key];
    }
    return o2;
   }

  useEffect(hook, [])

  const show = (event, id) => {
    event.preventDefault()
    var findCountry = countriesToShow.find(country => country.cca2 === id)
    appendCountryWithWeather(findCountry)
  }


  const filterCountries = (filterName) => {
    console.log(`get country with filterName: ${filterName}`)
    const adjustCountries = countries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase()))
    console.log(adjustCountries)
    if (adjustCountries == null || adjustCountries.length == 0) {
      setCountriesToShow([])
      setSpecificCountry([])
      setErrorMessage('Cannot found any results matched your search')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else if (adjustCountries.length > 10) {
      setCountriesToShow([])
      setSpecificCountry([])
      setErrorMessage('Too many matches, specify another filters')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else if(adjustCountries.length < 10 && adjustCountries.length > 1) {
      setCountriesToShow(adjustCountries)
      setErrorMessage(null)
      setSpecificCountry([])
    } else {
      setCountriesToShow([])
      setErrorMessage(null)
      // setSpecificCountry(adjustCountries)
      var findCountry = adjustCountries[0]
      appendCountryWithWeather(findCountry)
    }
  }

  const appendCountryWithWeather = (country) => {
    if(country != null) {
      weatherService.getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]).then(response => {
      const weather = response.data
      console.log(weather)
      const countryWithWeather = jsonConcat(country, weather);
      if(specificCountry != null) {
        var findCountry = specificCountry.find(c => c.cca2 === country.cca2)
      }
      if(findCountry != null) {
        console.log("country already been added to detail country lists")
        return
      }
      var newSpecificCountry = specificCountry.concat(countryWithWeather)
      setSpecificCountry(newSpecificCountry)
    })
  }
}

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
  }


  return (
    <>
    <div>
    <CountrySearch filterName={filterName} handleFilterNameChange={(event) => handleFilterNameChange(event)}></CountrySearch>
    </div>
    <Notification message={errorMessage} />
    <ul>
        {countriesToShow.map(country => 
          <CountryItem 
            key={country.cca2} 
            country={country}
            show={(event) => show(event, country.cca2)}
          />
        )}
    </ul>
    <ul>
        {specificCountry.map(country => 
          <Country 
            key={country.cca2} 
            country={country}
          />
          )
        }
    </ul>
    </>
  )
}

export default App
