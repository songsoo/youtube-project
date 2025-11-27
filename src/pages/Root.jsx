import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import ScrollToTop from '../components/Common/ScrollToTop';

export default function Root() {
    return (
        <div className="h-full w-full max-w-[90vw] flex-1 text-amber-50 min-[250rem]:w-[50vw]">
            <ScrollToTop />
            <Navbar />
            <Outlet />
        </div>
    );
}
