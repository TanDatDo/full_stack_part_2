const CountrySearch = (props) => (
    <div>
      find countries : <input 
              value={props.filterName} 
              onChange={props.handleFilterNameChange}
            />
    </div>
    )

export default CountrySearch