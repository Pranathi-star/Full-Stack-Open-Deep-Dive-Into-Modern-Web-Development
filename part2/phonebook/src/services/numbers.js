import axios from 'axios'

const baseUrl = `/api/persons`

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

const deleteNumber = (id) => {
    return axios
    .delete(baseUrl + `/${id}`)
    .then(response => response.data)
}

const updateNumber = (updatedEntry, id) => {
    return axios
    .put(baseUrl + `/${id}`, updatedEntry)
    .then(response => response.data)
}

const numberService = { getNumbers, addNumber, deleteNumber, updateNumber }
export default numberService
