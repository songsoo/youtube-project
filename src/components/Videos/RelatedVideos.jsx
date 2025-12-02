import { useQuery, QueryClient } from '@tanstack/react-query';
import VideoCard from './VideoCard';
import Youtube from '../../utils/youtubeAPI';
import VideoCardSkeleton from './VideoCardSkeleton';

export default function RelatedVideos() {
    const queryClient = new QueryClient();
    const {
        isLoading,
        error,
        data: videos,
    } = useQuery({
        queryKey: ['videos', 'popular'],
        queryFn: async () => {
            const youtube = new Youtube();
            return await youtube.getPopularVideos();
        },
        staleTime: 1000 * 60 * 50, //50분
        onSuccess: (videos) => {
            videos.forEach((video) => {
                queryClient.setQueryData(['video', video.videoId], video);
            });
        },
    });

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
