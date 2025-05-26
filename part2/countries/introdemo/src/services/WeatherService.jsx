import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const byName = 'https://studies.cs.helsinki.fi/restcountries/api/name/name'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put('', newObject)
    return request.then(reponse => reponse.dta)
}

export default {
    getAll: getAll,
    create: create, 
    update: update,
}