import React from 'react';
import HomeButton from './HomeButton';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router';

export default function Navbar() {

    return (
        <div className="flex">
            <HomeButton/>
            <SearchBar />
        </div>
    );
}
