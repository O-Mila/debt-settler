import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
	const { isLoggedIn, logOut } = props;
    const navLinks = isLoggedIn ? (
    <div className="ui teal two item inverted menu">
      <Link to='/groups' className="item">Home</Link>
      <div onClick={logOut} className="item pointer">Log out</div>
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