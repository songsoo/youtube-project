import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from '../page/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
