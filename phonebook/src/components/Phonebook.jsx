const Phonebook = (props) => (
        <div>
          filter show with : <input 
                  value={props.filterName} 
                  onChange={props.handleFilterNameChange}
                />
        </div>
        )

export default Phonebook