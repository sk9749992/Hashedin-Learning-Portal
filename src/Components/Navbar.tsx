import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {BiUserCircle} from 'react-icons/bi';
import { useGlobalContext } from '../context';

const Navbar = (): JSX.Element => {
  const {courseWidget} = useGlobalContext();
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    setCartCount(courseWidget?.length);
  }, [courseWidget])
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
            <NavLink to='/cart' className='nav-cart-container'>
              <AiOutlineShoppingCart className='header-link-icons'></AiOutlineShoppingCart>
              <span className='cart-count'>{cartCount}</span>
            </NavLink>
            <NavLink to='/profile' >
              <BiUserCircle className='header-link-icons'></BiUserCircle>
            </NavLink>
        </div>
    </div>
  )
}

export default Navbar;