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
        <>
            <nav className="flex shrink-0 basis-96 flex-col gap-2 lg:hidden">
                {videos?.items?.map((item, index) => (
                    <VideoCard
                        item={item}
                        key={index}
                        isVertical={true}
                        showChannelImg={true}
                        showHoverEffect={true}
                    />
                ))}
            </nav>
            <nav className="hidden shrink-0 basis-96 flex-col gap-2 lg:flex">
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
        </>
    );
}
