import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getVideoIndex } from '../utils/video';

export function useVideoData(channelId, videoId) {
    const { data: channelInfo } = useQuery({
        queryKey: ['channelInfo', channelId],
        queryFn: () => {
            return fetch(`/data/channelInfo.json`)
                .then((response) => response.json())
                .then((data) => {
                    return data.items[0].snippet;
                });
        },
        staleTime: 1000 * 60 * 50,
    });
    const colorNum = useMemo(() => getVideoIndex(videoId), [videoId]);
    return { channelInfo, colorNum };
}
