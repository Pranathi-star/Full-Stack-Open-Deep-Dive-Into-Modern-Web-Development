import axios from 'axios'

const baseUrl = `http://localhost:3001/persons`

const getNumbers = () => {
    return axios
    .get(baseUrl)
    .then(response => response.data)
}

const addNumber = (newEntry) => {
    return axios
    .post(baseUrl, newEntry)
    .then(response => response.data)
}

const deleteNumber = (name) => {
    return axios
    .delete(baseUrl + `/${name}`)
    .then(response => response.data)
}

const numberService = { getNumbers, addNumber, deleteNumber }
export default numberService
