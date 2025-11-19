import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Root from '../page/Root';
import VideoDetail from '../page/VideoDetail';
import Videos from '../page/Videos';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <Videos />,
            },
            {
                path: 'videos',
                children: [
                    {
                        path: ':searchQuery',
                        element: <Videos />,
                    },
                    {
                        path: 'watch/:videoId',
                        element: <VideoDetail />,
                    },
                ],
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
