import axios from 'axios'

const countryBaseUrl = `https://studies.cs.helsinki.fi/restcountries/api`
const weatherBaseUrl = `https://api.openweathermap.org/data/2.5/weather`

const getAllCountries = () => {
    return axios
    .get(countryBaseUrl + `/all`)
    .then(response => response.data)
}

const getDataOfCountry = (country) => {
    return axios
    .get(countryBaseUrl + `/name/${country}`)
    .then(response => response.data)
}

const getWeather = (c) => {
    return axios
    .get(weatherBaseUrl + `?lat=${c.capitalInfo.latlng[0]}&lon=${c.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
    .then(response => response.data)

}
const countryServices = {getAllCountries, getDataOfCountry, getWeather}
export default countryServices