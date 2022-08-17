import React from 'react'
import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div className='navbar-container'>
            <h1>{user?.name}</h1>
        </div>
    )
}

export default Navbar;