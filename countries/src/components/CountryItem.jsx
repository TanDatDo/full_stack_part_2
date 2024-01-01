const CountryItem = ({country, show}) => 
<li>
  {country.name.common} <button onClick={show}>show</button>
</li>

export default CountryItem