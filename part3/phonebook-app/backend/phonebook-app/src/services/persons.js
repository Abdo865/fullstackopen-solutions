import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

async function list() {
  const response = await axios.get(baseUrl)
  return response.data
}

async function create(person) {
  const response = await axios.post(baseUrl, person)
  return response.data
}

async function remove(id) {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

async function update(id, person) {
  const response = await axios.put(`${baseUrl}/${id}`, person)
  return response.data
}

export default { create, list, remove, update }
