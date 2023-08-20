import { useState } from 'react'

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

const Persons = ({ filtered }) => {
  return (
    <>
      {filtered.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }

  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState(persons)

  let alreadyPresent = false;

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
        number: newNumber,
        id: persons.length + 1
      }
      let newPersons = persons.concat(newEntry)
      setPersons(newPersons)
      setFiltered(newPersons)

    }
    else{
      alert(newName + " is already added to phonebook");
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
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter = {handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm handleSubmit = {handleSubmit} handleChangeName = {handleChangeName} handleChangeNumber = {handleChangeNumber}/>
      <h2>Numbers</h2>
      <Persons filtered = {filtered} />
    </div>
  )
}

export default App