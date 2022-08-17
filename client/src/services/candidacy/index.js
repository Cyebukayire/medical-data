import axios from "axios";
import { API_URL } from "../../config";
export const getAllCandidates = async (req, res) => {
        return  await axios.get(`${API_URL}/candidacy`, {
            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
        })
        .then((res)=> {
            return res.data
        })
        .catch((err)=>{
            return err.response.data || error?.message;
        })
}
export const voteCandidate = async(id) => {
    return await axios.put(`${API_URL}/candidacy/${id}/vote`,{},{
        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
    })
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err.response.data || error?.message
    })
}