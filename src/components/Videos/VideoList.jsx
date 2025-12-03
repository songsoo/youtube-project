import Error from '../Common/Error';
import VideoCard from './VideoCard';
import VideoCardSkeleton from './VideoCardSkeleton';

export default function VideoList({ videos, isLoading, error }) {
    return (
        <div className="grid w-full h-full grid-cols-1 gap-4 min-[50rem]:grid-cols-2 min-[85rem]:grid-cols-3 min-[110rem]:grid-cols-4">
            {isLoading ? (
                Array.from({ length: 24 }).map((_, i) => (
                    <VideoCardSkeleton isVertical={true} key={i} />
                ))
            ) : error ? (
                <Error ErrorClass="w-full h-full" />
            ) : (
                videos?.map((video, index) => <VideoCard video={video} key={video.videoId} />)
            )}
        </div>
    );
}
