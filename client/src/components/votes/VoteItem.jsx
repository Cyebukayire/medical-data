import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
const VoteItem = ({id, name, avatar, votes, candidateMsg, imgStyles, styles, msgStyles, addVote}) => {
  const navigate = useNavigate();
    // const {id, name, avatar, votes} = props.vote;
    return (
        <div className='vote-wrapper' style={{...styles}}>
          <img src={avatar} alt={name} style={{...imgStyles}} />
          <div className='data-wrapper'>
            <h1>{name}</h1>
            <h2>{votes} Votes</h2>
          </div>
          <div style={{...msgStyles}}>
          {candidateMsg}
          </div>
          {candidateMsg ? 
            <div className='button-wrapper'>
            <button style={{backgroundColor: 'rgba(139, 172, 94, 0.903)'}} className='edit-btn' onClick={() => navigate(`/uploadCandidate?:userId=${id}`)}>Edit</button>
            <button style={{backgroundColor: 'rgb(189, 92, 92)'}} className='delete-btn'>Delete</button>
            </div> :
            <div className='button-wrapper'>
            <button onClick={addVote}>Vote</button>
            </div>
          }
        </div>
    );
}

export default VoteItem;