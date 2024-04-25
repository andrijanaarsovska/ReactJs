import axios from "axios";

// instanca za pravenje na site axios povici

const instance = axios.create({
    baseURL: 'http://localhost:8080/api'
    // headers: {
    //      'Access-Control-Allow-Origin': '*'
    // }
})
export default instance;