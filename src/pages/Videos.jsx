import React from 'react';
import VideoList from '../components/Videos/VideoList';
import { useParams } from 'react-router';
import { QueryClient, useQuery } from '@tanstack/react-query';
import Youtube from '../utils/youtubeAPI';

export default function Videos() {
    const { searchQuery } = useParams();
    const queryClient = new QueryClient();
    const {
        isLoading,
        error,
        data: videos,
    } = useQuery({
        queryKey: ['videoList', searchQuery ? searchQuery : 'popular'],
        queryFn: async () => {
            const youtube = new Youtube();
            if (searchQuery) {
                return await youtube.searchByKeyword(searchQuery);
            } else {
                return await youtube.getPopularVideos();
            }
        },
        staleTime: 1000 * 60 * 50, //50분
        onSuccess: (videos) => {
            videos.forEach((video) => {
                queryClient.setQueryData(['video', video.videoId], video);
            });
        },
    });

    return (
        <div className="flex">
            <VideoList videos={videos} isLoading={isLoading} />
        </div>
    );
}
