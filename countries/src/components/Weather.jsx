const Weather = ({ country, weather }) => 
  <div>
    <p> temperature {country.main.temp} Celcius</p>
    <p> wind {country.wind.speed} m/s</p>
    <img src={`https://openweathermap.org/img/wn/${country.weather[0].icon}@2x.png`}></img>
  </div>

export default Weather