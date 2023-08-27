import { useState, useEffect } from 'react'
import numberService from './services/numbers'

const goodNotificationStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const badNotificationStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const Notification = ({ message, isGood }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = isGood?
    goodNotificationStyle : badNotificationStyle

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const Filter = ({ handleFilter }) => {
  return (
    <>
      filter shown with<input onChange={handleFilter} />
    </>
  )
}

const PersonForm = ({ handleSubmit, handleChangeName, handleChangeNumber }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
          <div>
            name: <input onChange={handleChangeName}/>
          </div>
          <div>
            number: <input onChange={handleChangeNumber}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
      </form>
    </>
  )
}

const Persons = ({ filtered, handleDelete }) => {
  return (
    <>
      {filtered.map((person) => 
      <div key={person.id}>
        <p style={{display: 'inline-block', paddingRight: '10px'}}>{person.name} {person.number}</p>
        <button style={{display: 'inline-block'}} onClick={() => handleDelete(person.id)}>delete</button>
      </div>
      )}
    </>
  )
}

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState(persons)
  const [isGood, setIsGood] = useState(null)
  const [message, setMessage] = useState(null)

  let alreadyPresent = false;

  useEffect(() => {
    numberService.getNumbers()
    .then(
      numbers => {
      setFiltered(numbers)
      setPersons(numbers)
      }
    )
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let idx in persons){
      if (persons[idx].name === newName){
        alreadyPresent = true;
        break
      }
    }
    if (alreadyPresent === false){
      const newEntry = {
        name: newName,
        number: newNumber
      }

      numberService.addNumber(newEntry)
      .then(
        numberResponse => {
          setPersons(persons.concat(numberResponse))
          setFiltered(persons.concat(numberResponse))
          positiveNotification(numberResponse.name)
        }
      )
      .catch(error => negativeNotification(error.response.data.error))
    }
    else{
      if (window.confirm(newName + " is already added to phonebook, replace the old number with a new one?")){
        const person = persons.find(person => person.name === newName)
        const updatedPerson = {name: person.name, number: newNumber, id: person.id}
        numberService.updateNumber(updatedPerson, person.id)
        .then((updatedEntry) => {
          const newPersons = persons.map(p => p.name !== newName ? p : updatedEntry)
          setPersons(newPersons)
          setFiltered(newPersons)
          positiveNotification(updatedEntry.name)
        }
        )
        .catch(error => negativeNotification(error.response.data.error))
      }
    }
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFiltered(persons.filter(person => person.name.toLowerCase().startsWith(event.target.value.toLowerCase()) === true))
  }

  
  const handleChangeName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)  
  }

  const handleChangeNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)  
  }

  const getName = (id) => {
    return persons.find(person => person.id === id).name
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete ' + getName(id) + '?')){
      const newPersons = persons.filter((item) => item.id !== id);
      numberService.deleteNumber(id)
      .then(() => {
        setFiltered(newPersons)
        setPersons(newPersons)
      }
      )
    }
  }

  const positiveNotification = (name) => {
    setIsGood(true)
    setMessage("Added " + name)
    setTimeout(() => {setMessage(null); setIsGood(null)}, 5000)
  }

  const negativeNotification = (name) => {
    setIsGood(false)
    setMessage("Information of " + {name} + " has already been removed from the server")
    setTimeout(() => {setMessage(null); setIsGood(null)}, 5000)
  }
  
  return (
    <div>
      <Notification message={message} isGood={isGood}/>
      <h2>Phonebook</h2>
      <Filter handleFilter = {handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm handleSubmit = {handleSubmit} handleChangeName = {handleChangeName} handleChangeNumber = {handleChangeNumber}/>
      <h2>Numbers</h2>
      <Persons filtered = {filtered} handleDelete = {handleDelete} />
    </div>
  )
}

export default App