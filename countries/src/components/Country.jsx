import Weather from "./Weather"
const Country = ({ country, weather }) => 
  <div>
    <h2>{country.name.common}</h2>
    <li>capital {country.capital}</li>
    <li>area {country.area}</li>
    <h3>languages</h3>
    <ul>
      {
      Object.keys(country.languages).map((key) => (
          <Language key={key} name={country.languages[key]} />
          ))
      }
    </ul>
    <div>{country.flag}</div>
    <Weather country={country} weather={weather} ></Weather>
  </div>

const Language = ({name}) => 
<li>
  {name}
</li>

export default Country