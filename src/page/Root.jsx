import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';

export default function Root() {
    return (
        <div className="bg-bgColor h-full w-full text-amber-50">
            <Navbar />
            <Outlet />
        </div>
    );
}
