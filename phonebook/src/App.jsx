import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('a new name')
  const [newNumber, setNewNumber] = useState('a new number')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const hook = () => {
    console.log('effect')
    personsService.getAll().then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }

  const Notification = ({message}) => {
    const notiStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    if(message == null) {
      return null
    }
    return (
      <div style={notiStyle} className='error'>
        {message}
      </div>
    )
  }

  const ErrorNotification = ({errorMessage}) => {
    const notiStyle = {
      color: 'red',
      fontStyle: 'italic',
      fontSize: 16
    }
    if(errorMessage == null) {
      return null
    }
    return (
      <div style={notiStyle} className='error'>
        {errorMessage}
      </div>
    )
  }
  
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    const findName = persons.find(person => person.name === newName)
    if (findName != null) {
      if (!window.confirm(`${newName} is already in the phone book, replace the old number with the new one`)) {
        return
      }
      const id = findName.id
      personsService.update(id, nameObject).then(response=> {
        setPersons(persons.map(person => person.id !== id ? person : response.data))
        setMessage(
          `Changed number for ${nameObject.name} to ${nameObject.number}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 1000)
      }).catch(error => {
        if(error.message.includes('404')) {
          const msg = `Information of ${nameObject.name} has already been removed from the server`
          setErrorMessage(msg)
          console.log.error(msg)
          setTimeout(() => {
            setErrorMessage(null)
          }, 1000)
        } else {
          const msg = `failed to upodate phone number for ${nameObject.name} with error ${error}`
          setErrorMessage(msg)
          console.log.error(msg)
          setTimeout(() => {
            setErrorMessage(null)
          }, 1000)
        }
        
      })
    } else {
      personsService.create(nameObject).then(response => {
        console.log(response)
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
        setMessage(
          `Added ${nameObject.name} with phone number ${nameObject.number}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 1000)
      }).catch(error => {
        const msg = `fail to add ${nameObject.name} with error: ${error}`
        setErrorMessage(
          msg
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 1000)
    })
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

  const deleteItem = (event, id) => {
    event.preventDefault()
    const index = persons.map(person => person.id).indexOf(id)
    const deletedPerson = persons[index]
    if (window.confirm(`Are you sure you want to delete ${deletedPerson.name}`)) {
      personsService.deleteItem(id).then(response => {
        console.log(response)
        const newArray = persons.filter((_, itemIndex)=> itemIndex !== index)
        console.log(newArray)
        setPersons(newArray)
      }).catch(error => {
        const msg = `fail to delete item ${id} with error: ${error}`
        console.log(msg)
        setErrorMessage(
          msg
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 1000)
      })
    }
  }


  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Phonebook filterName={filterName} handleFilterNameChange={(event) => handleFilterNameChange(event)}></Phonebook>
      <h2>Add a new</h2>
      <Notification message={message}></Notification>
      <ErrorNotification errorMessage={errorMessage}></ErrorNotification>
      <PersonForm
       newName={newName} newNumber={newNumber} handleNumberChange={(event) => handleNumberChange(event)} handleNameChange={(event)=>handleNameChange(event)} addPerson={(event) => addPerson(event)}
       ></PersonForm>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => 
          <Person 
            key={person.id} 
            person={person} 
            deleteItem={(event) => deleteItem(event, person.id)}
          />
          )
        }
      </ul>
    </div>
  )
}

export default App
