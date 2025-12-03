import React from 'react';
import VideoList from '../components/Videos/VideoList';
import { useParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Youtube from '../utils/youtubeAPI';
import { useEffect } from 'react';
import { useApiAvailable } from '../context/ApiCheckContextProvider';

export default function Videos() {
    const { searchQuery } = useParams();
    const queryClient = useQueryClient();
    const { controlIsApiAvailable } = useApiAvailable();
    const {
        isLoading,
        error,
        data: videos,
        status,
    } = useQuery({
        queryKey: ['videoList', searchQuery ? searchQuery : 'popular'],
        queryFn: async () => {
            const youtube = new Youtube();
            if (searchQuery) {
                return youtube.searchByKeyword(searchQuery);
            } else {
                return youtube.getPopularVideos();
            }
        },
        staleTime: 1000 * 60 * 50, //50분
        onSuccess: (videos) => {
            videos.forEach((video) => {
                queryClient.setQueryData(['video', video.videoId], video);
            });
        },
    });

    useEffect(() => {
        if (status === 'success') {
            videos.forEach((video) => {
                queryClient.setQueryData(['video', video.videoId], video);
            });
        } else if (status === 'error') {
            controlIsApiAvailable(false);
            // const reason = error?.response?.data?.error?.errors?.[0]?.reason;
            // if (reason === 'quotaExceeded') {
            //     controlIsApiAvailable(false);
            // }
        }
    }, [status]);

    return (
        <div className="flex">
            <VideoList videos={videos} isLoading={isLoading} error={error} />
        </div>
    );
}
