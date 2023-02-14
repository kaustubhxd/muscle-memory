import axios from "axios";

const client = axios.create({
    baseURL: process.env.REACT_APP_API,
    // timeout: 1000,
    // headers: {'X-Api-Key': REACT_APP_EXCERCISES_API_KEY}
});

export default client
  
