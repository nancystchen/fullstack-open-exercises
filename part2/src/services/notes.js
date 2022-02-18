import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes'

const getNotes = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const postNotes = (notes) => {
  return axios
    .post(baseUrl)
    .then(response => response.data)
}

const putNotes = (id, note) => {
  return axios
    .put(`${baseUrl}/${id}`, note)
    .then(response => response.data)
}

export default { getNotes, postNotes, putNotes }
