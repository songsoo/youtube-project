import VideoCard from './VideoCard';

export default function VideoList({ videos }) {
    return (
        <div className="grid grid-cols-1 gap-4 min-[50rem]:grid-cols-2 min-[85rem]:grid-cols-3 min-[110rem]:grid-cols-4">
            {videos?.items?.map((item, index) => (
                <VideoCard item={item} key={index} />
            ))}
        </div>
    );
}
