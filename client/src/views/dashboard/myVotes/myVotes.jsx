import React from "react";
import Layout from "../../../components/layout";
import VoteItem from "../../../components/votes/VoteItem";
import './styles.css'
import { votes } from "../../../utils/data"

const candidateMsg = "Lorem, asi. Nulla culpa incidunt, qui similique dicta dignissimos pariatur possimus molestias repudiandae magni, quisquam nemo ullam? Corporis perferendis, accusantium dolorem quos adipisci ex velit temporibus eligendi nemo itaque repellat."
const MyVotes = () => {
    const myVoteStyle = {
        imgSize: 500
    }
    const vote = votes[0];
    return(
       
        <Layout>
            <div className="my-profile-container">
                <VoteItem id={vote.id} name={vote.name} avatar={vote.avatar} votes={vote.votes} candidateMsg={candidateMsg} 
                styles={{MinHeight:'25vh',padding:'40px', backgroundColor:'white', borderRadius:'10px', boxShadow:'0px 0px 10px rgba(0,0,0,0.1)',
            display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                imgStyles={{height:'40vh', width: '50vh', margin: '23px'}}
                msgStyles={{width: '70vh', margin: '10px'}}/>
             </div>
        </Layout>
    )
}

export default MyVotes;