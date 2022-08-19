import axios from "axios";
import { SERVER2_API_URL } from '../../config'

export const getData =async (usertype) => {
    return await axios.post(`${SERVER2_API_URL}/data`, {
        usertype
    })
    .then((res) => {
        return res;
    })
    .catch((e) => {
        console.log("ERROR OCCURED")
    })
}