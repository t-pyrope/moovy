import React from 'react';
import { Link } from 'react-router-dom';
import SearchComponent from './SearchComponent';


const Header = () => {
    return (
        <div className="header__main">
            <h1><Link to="/">Moovy</Link></h1>
            <SearchComponent />
            <Link to="/rated">Rated by me</Link>
        </div>
    )
}

export default Header;
