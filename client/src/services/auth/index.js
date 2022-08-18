import axios from 'axios'
import e from 'cors';
import { Navigate } from 'react-router-dom';
import { SERVER1_API_URL, SERVER2_API_URL } from '../../config'

export const login = async (data) => {
    return axios.post({
        method: 'post',
        url: `${SERVER1_API_URL}/Authenticate`,
        data,
        headers: {
            'Content-Type': 'text/plain'
        },
    })
    .then(({res}) => {
        return res;
    })
    .catch(e => console.error(e));
}

export const register = async (data) => {
    return axios.post({
    method: 'post',
    url:`${SERVER1_API_URL}/Signup`, 
    data,
    headers: {
        'Content-Type': 'text/plain'
       }
    })
    .then(({res}) => {
        if(res.includes('successfully')){
            Navigate('/login')
        }
    })
    .catch(e => {console.error(e)});
}

export const getData = async (role) => {
    return axios.get(`${SERVER2_API_URL}/getinfo`, role)
    .then(({res}) => {
        return res;
    })
    .catch((e) => {
        return console.error(e);
    })
}