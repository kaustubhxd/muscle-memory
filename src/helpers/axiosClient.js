import axios from "axios";

const EXERCISES_URL = "https://api.api-ninjas.com/v1/exercises"
const REACT_APP_EXCERCISES_API_KEY = process.env.REACT_APP_EXCERCISES_API_KEY

const client = axios.create({
    baseURL: EXERCISES_URL,
    // timeout: 1000,
    headers: {'X-Api-Key': REACT_APP_EXCERCISES_API_KEY}
});

export default client
  