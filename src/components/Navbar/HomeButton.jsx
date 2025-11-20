import React from 'react';
import { useNavigate } from 'react-router';
import youtube_logo from '@/assets/youtube_logo.png';

export default function HomeButton() {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate('/')} className="hover: h-full cursor-pointer py-2">
            <img src={youtube_logo} className="h-full" />
        </button>
    );
}
