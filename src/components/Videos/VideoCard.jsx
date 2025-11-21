import { colors } from '../../utils/video';
import { useVideoCard } from '../../hooks/videoHooks';
import { decodeHtml } from '../../utils/text';
import { useNavigate } from 'react-router';

export default function VideoCard({ item }) {
    const { channelInfo, colorNum } = useVideoCard(item);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`videos/watch/${item.id.videoId}`);
    };

    return (
        <div className="group relative h-fit w-full hover:cursor-pointer" onClick={handleClick}>
            <img
                src={item.snippet.thumbnails.high.url}
                className="relative z-10 aspect-video w-full rounded-xl object-cover"
            />
            <div className="mt-3 flex gap-3">
                <img
                    className="mt-1 h-10 w-10 rounded-full"
                    src={channelInfo?.thumbnails?.high?.url}
                />
                <div>
                    <p className="line-clamp-2 font-extrabold break-all text-neutral-100">
                        {decodeHtml(item.snippet.title)}
                    </p>
                    <p className="w-fit text-[0.85rem] font-medium text-neutral-400 hover:text-white">
                        {item.snippet.channelTitle}
                    </p>
                    <p className="text-[0.85rem] font-medium text-neutral-400">
                        {item.snippet.publishedAt}
                    </p>
                </div>
            </div>
            <div
                className={`pointer-events-none absolute top-1/2 left-1/2 h-full w-full -translate-1/2 rounded-xl ${colors[colorNum]} opacity-0 transition duration-400 ease-out group-hover:scale-107 group-hover:cursor-pointer group-hover:opacity-30`}
            ></div>
        </div>
    );
}
