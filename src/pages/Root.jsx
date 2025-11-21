import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';

export default function Root() {
    return (
        <div className="h-full w-full max-w-[80vw] flex-1 text-amber-50 min-[250rem]:w-[50vw]">
            <Navbar />
            <Outlet />
        </div>
    );
}
