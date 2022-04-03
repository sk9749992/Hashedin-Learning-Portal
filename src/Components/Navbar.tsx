import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {BiUserCircle} from 'react-icons/bi';

const Navbar = () => {
  return (
    <div className='nav-bar'>
        <div className='company-name'>
            <Link to='/' className='company-name-link'>
                Hashed<span className="upper-half-company-name">In</span> <br />
                <span className="lower-half">By Deloitte</span>
            </Link>
        </div>
        <div className="header-links">
            <NavLink to='/' className='header-link'>courses</NavLink>
            <NavLink to='/whislist' className='header-link'>my whislist</NavLink>
            <NavLink to='/cart'>
              <AiOutlineShoppingCart className='header-link-icons'></AiOutlineShoppingCart>
            </NavLink>
            <NavLink to='/profile' >
              <BiUserCircle className='header-link-icons'></BiUserCircle>
            </NavLink>
        </div>
    </div>
  )
}

export default Navbar;