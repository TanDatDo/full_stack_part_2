import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('a new name')
  const [newNumber, setNewNumber] = useState('a new number')
  const [filterName, setFilterName] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const names = persons.map(person => person.name)
    if (!names.includes(newName)) {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }

      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }


  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Phonebook filterName={filterName} handleFilterNameChange={(event) => handleFilterNameChange(event)}></Phonebook>
      <h2>Add a new</h2>
      <PersonForm
       newName={newName} newNumber={newNumber} handleNumberChange={(event) => handleNumberChange(event)} handleNameChange={(event)=>handleNameChange(event)} addPerson={(event) => addPerson(event)}
      // props={props}
       ></PersonForm>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}></Persons>
    </div>
  )
}

export default App