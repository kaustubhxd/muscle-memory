import axios from "axios";

const { REACT_APP_API_URL, REACT_APP_API_VERSION } = process.env
console.log(REACT_APP_API_URL, REACT_APP_API_VERSION)

const client = axios.create({
    baseURL: `${REACT_APP_API_URL}/${REACT_APP_API_VERSION}`,
    // timeout: 1000,
});

export default client
  
