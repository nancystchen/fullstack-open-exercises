import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'
const get = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}
const post = (person) => {
  return axios
    .post(baseUrl, person)
    .then(response => response.data)
}
const put = (id, person) => {
  return axios
    .put(`${baseUrl}/${id}`, person)
    .then(response => response.data)
}

const del = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`) 
    .then(response => 
      console.log("resource deleted")
    )
}

export default {get, post, put, del}

