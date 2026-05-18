import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY

const baseUrl = `https://api.openweathermap.org/data/2.5/find?q=`



const get = (name) => {
    const request = axios.get(`${baseUrl}${name}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)   
}


export default { get }