import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getVideoIndex } from '../utils/video';

export function useVideoCard(item) {
    const { data: channelInfo } = useQuery({
        queryKey: ['channelInfo', item.snippet.channelId],
        queryFn: () => {
            return fetch(`data/channelInfo.json`)
                .then((response) => response.json())
                .then((yeah) => {
                    return yeah.items[0].snippet;
                });
        },
        staleTime: 1000 * 60 * 50,
    });
    const colorNum = useMemo(() => getVideoIndex(item.id.videoId), [item.id.videoId]);
    return { channelInfo, colorNum };
}
