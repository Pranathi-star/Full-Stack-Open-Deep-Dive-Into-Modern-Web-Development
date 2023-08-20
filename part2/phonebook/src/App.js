import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  let alreadyPresent = false;

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let idx in persons){
      console.log(idx)
      if (persons[idx].name === newName){
        alreadyPresent = true;
        break
      }
    }
    if (alreadyPresent === false){
      const newEntry = {
        name: newName
      }
      setPersons(persons.concat(newEntry))
    }
    else{
      alert(newName + " is already added to phonebook");
    }
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