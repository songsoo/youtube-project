import React from 'react';
import HomeButton from './HomeButton';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router';

export default function Navbar() {
    return (
        <nav className='relative z-10'>
            <div className="p-b-8 flex h-16 w-full items-center justify-between">
                <HomeButton />
                <SearchBar />
                <span></span>
            </div>
            <div className="mt-1 mb-5 border-b border-neutral-600"></div>
        </nav>
    );
}
