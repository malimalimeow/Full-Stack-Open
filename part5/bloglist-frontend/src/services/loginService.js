import axios from 'axios'
const baseUrl = '/api/login'

const authorize = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { authorize }
