import { useState, useEffect } from 'react'
import getAllCountries from './services/countries';

const Results = ({countries}) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (countries.length > 1){
    return (
      <>
      {countries.map((country) => <p>{country.name.common}</p>)}
      </>
    )
  }
  else if (countries.length === 1){
    console.log(countries[0])
    const langObject = countries[0].languages
    const langList = Object.values(langObject)
    const languages = langList.map((lang) => <li>{lang}</li>)
    return (
      <>
        <h1>{countries[0].name.common}</h1>
        <p>capital {countries[0].capital[0]}</p>
        <p>area {countries[0].area}</p>
        <h2>languages:</h2>
        <ul>
          {languages}
        </ul>
        <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
      </>
    )
  }
}

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [countries, setCountries] = useState([])

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    getAllCountries(event.target.value)
    .then(countries => 
      {
        const reqCountries = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
        setCountries(reqCountries)
      }
    )
  }

  return (
    <div>
      find countries <input value={searchQuery} onChange={handleChange} />    
      <Results countries = {countries}/>  
    </div>
  );
}

export default App;
