import { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../../../components/layout"
import VoteItem from "../../../components/votes/VoteItem";
import { getAllCandidates, voteCandidate } from "../../../services/candidacy";
import { votes } from "../../../utils/data";
import './styles.css';

const Votes = () => {
    const [candidates, setCandidates] = useState([]);
    const AllCandidates = async() => {
        const response = await getAllCandidates();
        setCandidates(response.data);
    }
    useEffect(()=>{
        AllCandidates();
    }, [])
    const addVote = async (id) => {
        const response = await voteCandidate(id);
        if(response?.success){
            AllCandidates();
            toast.success("Voted Successfully");
        }else{
            toast.error(response?.message || "Something went wrong");
        }
    }
    return (
        <Layout>
            <Toaster/>
            <div className="candidates">
                <h1>Candidates</h1>
                <div className="candidates-box">
                    {candidates.map((vote, index) => (
                        <div key={index.toString()} className='candidate'>
                           <VoteItem id={vote._id} name={vote.user.name} avatar={vote.avatar} votes={vote.votes} addVote={()=>addVote(vote._id)} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Votes;