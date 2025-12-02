import { decodeHtml, parseIso8601Duration } from '../../utils/text';
import { Link } from 'react-router';
import { getDominantColor } from '../../utils/image';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDateDiff } from './../../utils/text';

export default function VideoCard({
    isVertical = true,
    showChannelImg = true,
    showHoverEffect = true,
    video,
}) {
    const [color, setColor] = useState({ r: 0, g: 0, b: 0 });

    useEffect(() => {
        getDominantColor(video.thumbnail).then((color) => {
            setColor({ r: color.r, g: color.g, b: color.b });
        });
    }, [video.videoId]);

    return (
        <Link
            className={`group relative h-fit w-full hover:cursor-pointer ${!isVertical && 'flex gap-3'}`}
            to={`/videos/watch/${video.videoId}`}
        >
            <div
                className={`relative z-10 aspect-video rounded-xl ${isVertical ? 'mb-2 w-full' : 'w-40'}`}
                style={{
                    background: `url("${video.thumbnail}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="absolute right-1.5 bottom-1.5 rounded-sm bg-black/80 px-1.5 text-xs font-medium text-white">
                    {parseIso8601Duration(video.duration)}
                </div>
            </div>
            <div className={`flex flex-1 gap-3`}>
                {showChannelImg && (
                    <img
                        className="mt-1 h-10 w-10 shrink-0 rounded-full"
                        src={video.channelThumbnail}
                    />
                )}

                <div className={`flex flex-col ${!isVertical && 'gap-1'}`}>
                    <p
                        className={`line-clamp-2 font-semibold break-all text-neutral-100 ${isVertical ? 'text-md' : 'text-sm'} `}
                    >
                        {decodeHtml(video.title)}
                    </p>
                    <p
                        className={`w-fit font-medium text-neutral-400 ${isVertical ? 'text-[0.825rem] hover:text-white' : 'text-xs'}`}
                    >
                        {video.channelTitle}
                    </p>
                    <p
                        className={`${isVertical ? 'text-[0.85rem]' : 'text-xs'} font-medium text-neutral-400`}
                    >
                        {getDateDiff(video.publishedAt)}
                    </p>
                </div>
            </div>
            {showHoverEffect && (
                <div
                    className={`pointer-events-none absolute top-1/2 left-1/2 h-full w-full -translate-1/2 rounded-xl opacity-0 transition duration-400 ease-out group-hover:scale-105 group-hover:cursor-pointer group-hover:opacity-40`}
                    style={{
                        backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                        filter: 'saturate(1.4)',
                    }}
                ></div>
            )}
        </Link>
    );
}
