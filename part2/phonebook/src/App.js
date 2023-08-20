import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = {
      name: newName
    }
    setPersons(persons.concat(newEntry))
    setNewName('')
  }
  
  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)  
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App