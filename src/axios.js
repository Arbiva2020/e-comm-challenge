// axios is a fetching library
import axios from 'axios';

 const instance = axios.create({
     baseURL: 'http://localhost:5001/e-comm-challenge/us-central1/api'    //the API (cloud function) URL
 });

 export default instance;
