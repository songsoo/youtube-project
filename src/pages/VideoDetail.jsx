import { useParams } from 'react-router';
import VideoPlayer from '../components/Videos/VideoPlayer';
import { useQuery } from '@tanstack/react-query';
import RelatedVideos from '../components/Videos/RelatedVideos';

export default function VideoDetail() {
    const { videoId } = useParams();
    const {
        isLoading,
        error,
        data: videoDetail,
    } = useQuery({
        queryKey: ['videoDetail', videoId],
        queryFn: () => {
            return fetch(`/data/getVideoInfo.json`).then((response) => response.json());
        },
        staleTime: 1000 * 60 * 50, //50분
    });

    return (
        <main className="flex flex-col gap-5 lg:flex-row">
            <VideoPlayer videoId={videoId} videoDetail={videoDetail?.items[0]} />
                <RelatedVideos />
        </main>
    );
}
