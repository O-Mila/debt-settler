import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
	const { isLoggedIn } = props;
    const navLinks = isLoggedIn ? (
    <div className="ui teal two item inverted menu">
      <Link to='/groups' className="item">Home</Link>
      <Link to='/logout' className="item">Log out</Link>
    </div>
    ) : (
    <div className="ui teal two item inverted menu">
      <Link to='/register' className="item">Register</Link>
      <Link to='/login' className="item">Login</Link>
    </div>
    )
    return (
      <div>{navLinks}</div>
    )
}

export default Navbar;