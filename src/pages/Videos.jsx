import React from 'react';
import VideoList from '../components/Videos/VideoList';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function Videos() {
    const { searchQuery } = useParams();
    const {
        isLoading,
        error,
        data: videos,
    } = useQuery({
        queryKey: ['videos'],
        queryFn: () => {
            return fetch(`/data/listbykeyword.json`).then((response) => response.json());
        },
        staleTime: 1000 * 60 * 50, //50분
    });

    return (
        <div className="flex">
            <VideoList videos={videos} />
            <div></div>
        </div>
    );
}
