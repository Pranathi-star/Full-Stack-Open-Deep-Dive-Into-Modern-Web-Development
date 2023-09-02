import axios from 'axios'

const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api`

const getAllCountries = () => {
    return axios
    .get(baseUrl + `/all`)
    .then(response => response.data)
}

const getDataOfCountry = (country) => {
    return axios
    .get(baseUrl + `/name/${country}`)
    .then(response => response.data)
}

const countryServices = {getAllCountries, getDataOfCountry}
export default countryServices