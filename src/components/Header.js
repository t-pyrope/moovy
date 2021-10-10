import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchComponent from './SearchComponent';


const Header = () => {
    const { page } = useSelector(state => state.search);

    return (
        <div className="header__main">
            <h1><Link to="/">Moovy</Link></h1>
            <SearchComponent page={page} />
            <Link to="/rated">Rated by me</Link>
        </div>
    )
}

export default Header;
