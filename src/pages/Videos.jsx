import React from 'react';
import VideoList from '../components/Videos/VideoList';
import { useParams } from 'react-router';
import { useEffect } from 'react';

export default function Videos() {

    const { searchQuery } = useParams();

    return (
        <div>
            <VideoList />
        </div>
    );
}
