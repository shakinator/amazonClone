// axios is a very very popular fetching library, it allows you to interact with API's very smoothly
import axios from "axios";

const instance = axios.create( {
    baseURL:'http://localhost:5001/clone-81a7e/us-central1/api'
});

export default instance ;