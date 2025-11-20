import React from 'react';
import HomeButton from './HomeButton';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router';

export default function Navbar() {
    return (
        <div className="flex h-16 w-full items-center justify-between">
            <HomeButton />
            <SearchBar />
            <p></p>
        </div>
    );
}
