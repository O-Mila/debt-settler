import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
	const { isLoggedIn } = props;
    const navLinks = isLoggedIn ? (
    <div className="navbar navbar-expand-sm navbar-dark bg-info">
      <Link to='/groups' className="nav-link text-light text-center w-50">Home</Link>
      <Link to='/logout' className="nav-link text-light text-center w-50">Log out</Link>
    </div>
    ) : (
    <div className="navbar navbar-expand-sm navbar-dark bg-info">
      <Link to='/register' className="nav-link text-light text-center w-50">Register</Link>
      <Link to='/login' className="nav-link text-light text-center w-50">Login</Link>
    </div>
    )
    return (
      <div>{navLinks}</div>
    )
}

export default Navbar;