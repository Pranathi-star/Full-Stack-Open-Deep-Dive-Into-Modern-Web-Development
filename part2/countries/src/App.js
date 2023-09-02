import { useState, useEffect } from 'react'
import countryServices from './services/countries';
import Filter from './components/Filter';
import Results from './components/Results';

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryServices.getAllCountries()
    .then((countryResponse) => setCountries(countryResponse))
  }, [])

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  }

  const handleShow = (country) => {
    setSearchQuery(country)
  }

  return (
    <div>
      <Filter searchQuery = {searchQuery} handleChange = {handleChange} />
      <Results countries = {countries} searchQuery = {searchQuery} handleShow = {handleShow} />  
    </div>
  );
}

export default App;
