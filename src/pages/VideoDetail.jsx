import { useParams } from 'react-router';
import VideoPlayer from '../components/Videos/VideoPlayer';
import { useQuery } from '@tanstack/react-query';
import RelatedVideos from '../components/Videos/RelatedVideos';
import Youtube from '../utils/youtubeAPI';
import VideoPlayerSkeleton from '../components/Videos/VideoPlayerSkeleton';
import Error from '../components/Common/Error';
import { useEffect } from 'react';
import { useApiAvailable } from '../context/ApiCheckContextProvider';

export default function VideoDetail() {
    const { controlIsApiAvailable } = useApiAvailable();
    const { videoId } = useParams();
    const {
        isLoading,
        error,
        data: video,
        status,
    } = useQuery({
        queryKey: ['video', videoId],
        queryFn: async () => {
            const youtube = new Youtube();
            return youtube.getVideoChannelInfo(videoId);
        },
        staleTime: 1000 * 60 * 50, //50분
    });

    useEffect(() => {
        if (status === 'error') {
            controlIsApiAvailable(false);
            // const reason = error?.response?.data?.error?.errors?.[0]?.reason;
            // if (reason === 'quotaExceeded') {
            //     controlIsApiAvailable(false);
            // }
        }
    }, [status]);

    return (
        <main className="flex w-full flex-col gap-5 lg:flex-row">
            {isLoading ? (
                <VideoPlayerSkeleton />
            ) : error ? (
                <Error ErrorClass="relative w-full flex-1 shrink" />
            ) : (
                <VideoPlayer videoId={videoId} video={video} isLoading={isLoading} />
            )}
            <RelatedVideos />
        </main>
    );
}
