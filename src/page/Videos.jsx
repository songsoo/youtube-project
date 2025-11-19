import React from 'react';
import VideoList from '../components/Videos/VideoList';
import { useParams } from 'react-router';
import { useEffect } from 'react';

export default function Videos() {

    const { searchQuery } = useParams();

    useEffect(() => {
        console.log(searchQuery);
        console.log('입니다.');
    }, []);

    return (
        <div>
            <p>{searchQuery}</p>
            <VideoList />
        </div>
    );
}
