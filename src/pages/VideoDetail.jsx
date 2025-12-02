import { useParams } from 'react-router';
import VideoPlayer from '../components/Videos/VideoPlayer';
import { useQuery } from '@tanstack/react-query';
import RelatedVideos from '../components/Videos/RelatedVideos';
import Youtube from '../utils/youtubeAPI';
import VideoPlayerSkeleton from '../components/Videos/VideoPlayerSkeleton';

export default function VideoDetail() {
    const { videoId } = useParams();
    const {
        isLoading,
        error,
        data: video,
    } = useQuery({
        queryKey: ['video', videoId],
        queryFn: async () => {
            try {
                const youtube = new Youtube();
                return youtube.getVideoChannelInfo(videoId);
            } catch (e) {
                console.log(e);
            }
        },
        staleTime: 1000 * 60 * 50, //50분
    });

    return (
        <main className="flex flex-col gap-5 lg:flex-row">
            {isLoading ? (
                <VideoPlayerSkeleton />
            ) : (
                <VideoPlayer videoId={videoId} video={video} isLoading={isLoading} />
            )}
            <RelatedVideos />
        </main>
    );
}
