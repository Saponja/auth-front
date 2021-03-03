import {axios} from 'axios';

const baseUrl = `https://localhost:44355/api/auth/`;
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem(token)}`;
}


export default {
    
    apiCall(url = baseUrl){
        return {
            register : axios.post(url + 'register', data)
            .then(response => P)


        }
    }
}