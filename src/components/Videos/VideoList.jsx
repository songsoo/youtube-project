import React from 'react';
import { useNavigate } from 'react-router';

export default function VideoList() {
    const navigate = useNavigate();

    return <div onClick={() => navigate('/videos/watch/앙')}>비디오들</div>;
}
