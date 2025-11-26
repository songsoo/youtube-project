import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';

export default function RelatedVideos() {
    const {
        isLoading,
        error,
        data: videos,
    } = useQuery({
        queryKey: ['videos'],
        queryFn: () => {
            return fetch(`/data/listbykeyword.json`).then((response) => response.json());
        },
        staleTime: 1000 * 60 * 50, //50분
    });

    return (
        <nav className="shrink-0 basis-96 flex flex-col gap-2 ">
            {videos?.items?.map((item, index) => (
                <VideoCard
                    item={item}
                    key={index}
                    isVertical={false}
                    showChannelImg={false}
                    showHoverEffect={false}
                />
            ))}
        </nav>
    );
}
