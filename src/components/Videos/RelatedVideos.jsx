import { useQuery, useQueryClient } from '@tanstack/react-query';
import VideoCard from './VideoCard';
import Youtube from '../../utils/youtubeAPI';
import VideoCardSkeleton from './VideoCardSkeleton';
import Error from '../Common/Error';
import { useEffect } from 'react';
import { useApiAvailable } from '../../context/ApiCheckContextProvider';

export default function RelatedVideos() {
    const queryClient = useQueryClient();
    const { controlIsApiAvailable } = useApiAvailable();

    const {
        data: videos,
        isLoading,
        error,
        status,
    } = useQuery({
        queryKey: ['videoList', 'popular'],
        queryFn: async () => {
            const youtube = new Youtube();
            return youtube.getPopularVideos();
        },
        staleTime: 1000 * 60 * 50, //50분
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

    return isLoading ? (
        <>
            <nav className="flex shrink-0 basis-96 flex-col gap-2 lg:hidden">
                {Array.from({ length: 12 }).map((_, i) => (
                    <VideoCardSkeleton isVertical={true} key={i} />
                ))}
            </nav>
            <nav className="hidden shrink-0 basis-96 flex-col gap-2 lg:flex">
                {Array.from({ length: 12 }).map((_, i) => (
                    <VideoCardSkeleton isVertical={false} key={i} />
                ))}
            </nav>
        </>
    ) : error ? (
        <>
            <Error ErrorClass="flex shrink-0 basis-96 flex-col gap-2 lg:hidden" />
            <Error ErrorClass="hidden shrink-0 basis-96 flex-col gap-2 lg:flex" />
        </>
    ) : (
        <>
            <nav className="flex shrink-0 basis-96 flex-col gap-2 lg:hidden">
                {videos.map((item, index) => (
                    <VideoCard
                        key={index}
                        video={item}
                        isVertical={true}
                        showChannelImg={true}
                        showHoverEffect={true}
                    />
                ))}
            </nav>
            <nav className="hidden shrink-0 basis-96 flex-col gap-2 lg:flex">
                {videos.map((item, index) => (
                    <VideoCard
                        video={item}
                        key={index}
                        isVertical={false}
                        showChannelImg={false}
                        showHoverEffect={false}
                    />
                ))}
            </nav>
        </>
    );
}
